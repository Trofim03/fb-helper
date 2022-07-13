import {
	initializeApp, getApp, FirebaseApp
} from "firebase/app";
import {Analytics, getAnalytics} from "firebase/analytics";
import * as storageFB from "firebase/storage";
import {
	getDatabase, ref, get, push, child, set, remove, Database, DataSnapshot 
} from "firebase/database";
import {FirebaseStorage, UploadResult} from "firebase/storage";
import {
	getAuth,
	signInAnonymously,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	UserCredential,
	Auth,
	signInWithPhoneNumber,
	RecaptchaVerifier,
	ConfirmationResult 
} from "firebase/auth";

interface IConfig {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string
}

interface IPostParams {
    userId: string;
    postPath?: string;
    postId?: number;
    images?: File;
    text?: string;
}

interface IFileParams {
    file?: File;
    url: string;
}

interface IPhoneParams {
    phone?: string;
    code?: string;
}

interface ICaptchaParams {
    size: string;
    id: string;
}

interface IConstructorProps {
	firebaseConfig: IConfig,
	storageLink?: string,
	isDatabase?: boolean,
	isAnalytics?: boolean 
}

export class FirebaseHelper {
	config: IConfig;
	app: FirebaseApp;
	firebaseApp: FirebaseApp;
	auth: Auth;
	analytics: Analytics | null;
	storage: FirebaseStorage | null;
	database: Database | null;
	confirmationResult?: ConfirmationResult; 

	constructor( props: IConstructorProps ) {
		this.config = props.firebaseConfig;
		this.app = initializeApp(this.config);
		this.firebaseApp = getApp();
		this.auth = getAuth();
		this.database = props.isDatabase ? getDatabase(this.app) : null;
		this.storage = props.storageLink? storageFB.getStorage(this.firebaseApp, props.storageLink) : null;
		this.analytics = props.isAnalytics ? getAnalytics(this.app) : null;
		this.confirmationResult = undefined;

	}

	accountEmail(
		action: string,
		email: string,
		password: string,
		regExpPasswd: RegExp | string = /^(?=.{6,15}$)/,
		regExpEmail?: RegExp | string
	): Promise<UserCredential | void> | Error 
	{
		const emailCorrect = regExpEmail && typeof regExpEmail == "object" ? regExpEmail.test(email) : true;
		const passwordCorrect = regExpPasswd && typeof regExpPasswd == "object" ? regExpPasswd.test(password) : true;

		if (!emailCorrect) {
			return new Error("email is incorrect");
		}
		if (!passwordCorrect) {
			return new Error("password is incorrect");
		}

		switch(action) {
		case "createNew":
			return createUserWithEmailAndPassword(
				this.auth, email, password
			);
		case "login":
			return signInWithEmailAndPassword(
				this.auth, email, password
			);
		case "forgetPassword":
			return sendPasswordResetEmail(this.auth, email);
		}

		return new Error("something wrong");
	}

	accountPhone(
		action: string, phoneParams: IPhoneParams, captchaParams?: ICaptchaParams
	): Error | Promise<UserCredential> {
		const recaptchaVerifier = captchaParams ? new RecaptchaVerifier(
			captchaParams.id, {
				"size": captchaParams.size,
			}, this.auth
		) : null;

		switch (action) {
		case "sendCode":{
			if (!phoneParams.phone) {
				return new Error("missing phone number");
			}

			recaptchaVerifier ? signInWithPhoneNumber(
				this.auth, phoneParams.phone, recaptchaVerifier
			)
				.then((confirmationResult) => {
					this.confirmationResult = confirmationResult;
					return;
				}).catch((error) => {
					return new Error(error.message);
				}) : new Error("recaptcha error");
			break;
		}
		case "verifyCode":{
			return (this.confirmationResult && phoneParams.code ? 
				this.confirmationResult.confirm(phoneParams.code) 
				: 
				new Error("confirmationResult or code not found"));
			break;
		}
		}
	}

	accountAnonymously(): Promise<UserCredential> {
		return signInAnonymously(this.auth);
	}

	userPost(action: string, postParams: IPostParams): Promise<DataSnapshot | void> | Error {
		if (!this.database) {
			return new Error("database is not found, check create config");
		}

		const dbRef = ref(this.database, postParams.userId);
		const postRef = ref(this.database, postParams.userId + "/" + (postParams.postId ?? ""));

		switch(action) {
		case "write":{
			const postListRef = ref(this.database, postParams.userId);
			const newPostRef = push(postListRef);
			return set(newPostRef, postParams);}
		case "readAll":{ 
			return get(child(dbRef, "/")); 
			break;
		}
		case "readOne":{
			return get(child(dbRef, "/" + postParams.postPath)); 
			break;
		}
		case "delete":{
			return remove(postRef); 
			break;
		}
		}  

		return new Error("something wrong");
	}

	userFiles(action: string, fileParams: IFileParams): Promise<string | UploadResult> | Error {
		if (!this.storage) {
			return new Error("storage is not found, check create config");
		}

		switch(action) {
		case "upload":{
			const storageRef = storageFB.ref(this.storage, `images/${fileParams.url}`);
			return storageFB.uploadBytes(storageRef, new Blob([
				JSON.stringify(fileParams.file)
			]));
			break;}
		case "download":{
			const pathReference = storageFB.ref(this.storage, fileParams.url);
			return storageFB.getDownloadURL(pathReference);
			break;}
		}

		return new Error("something wrong");
	}
}