# FB-Helper

The library helps to easily create requests to FireBase and without even understanding the database itself, just call one of the class methods and everything will be ready :)

## Installation

if you already install firebase:
```bash
npm i --save-dev fb-helper
```
else:
```bash
npm i --save-dev fb-helper firebase
```
## Usage

```js
import { FirebaseHelper } from "fb-helper";

// Config from firebase 
const firebaseConfig = {
    apiKey: "...,
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "...",
    measurementId: "...
};

const helper = new FirebaseHelper({firebaseConfig});
```

### Other config params
+ storageLink?: string, // link for you storage from firebase
+ isDatabase?: boolean, // true/false, specifies whether to create a database
+ isAnalytics?: boolean // true/false, specifies whether to create a analytics

## Methods
<table>
<thead>
	<tr>
		<th>Method</th>
		<th>Params</th>
		<th>Return</th>
	</tr>
</thead>
<tbody>
		<tr>
			<td rowspan="5">accountEmail</td>
			<td>action: "createNew || login || forgetPassword"</td>
			<td rowspan="5">Promise&#x3C;UserCredential | void&#x3E; | Error</td>
		</tr>
		<tr>
			<td>email: email new user</td>
		</tr>
		<tr>
			<td>password: new password</td>
		</tr>
		<tr>
			<td>regExpPasswd: regular expression for checking password </br>(default: /^(?=.{6,15}$)/)</br>(min length - 6 symbols)</td>
		</tr>
		<tr>
			<td>regExpEmail?: regular expression for checking email</td>
		</tr>
		<tr>
			<td rowspan="3">accountPhone</td>
			<td>action: "sendCode || verifyCode"</td>
			<td rowspan="3">Promise&#x3C;UserCredential&#x3E; | Error</td>
		</tr>
		<tr>
			<td>phoneParams: phone number or verify code from SMS</td>
		</tr>
		<tr>
			<td>captchaParams: id HTML element and size for captcha (<a href="https://firebase.google.com/docs/auth/web/phone-auth?hl=en&authuser=0">docs</a>)</td>
		</tr>
		<tr>
			<td>accountAnonymously</td>
			<td>no params</td>
			<td>Promise&#x3C;UserCredential&#x3E;</td>
		</tr>
		<tr>
		<td colspan="3" align="center"><b>Need created database</b></td>
		</tr>
		<tr>
			<td rowspan="2">userPost</td>
			<td>action: "write || readAll || readOne || delete"</td>
			<td rowspan="2">Promise&#x3C;ataSnapshot | void&#x3E; | Error</td>
		</tr>
		<tr>
			<td>postParams: userId, [optional: postPath, postId, images, text]</td>
		</tr>
		<tr>
			<td colspan="3" align="center"><b>Need created storage</b></td>
		</tr>
		<tr>
			<td rowspan="2">userFiles</td>
			<td>action: "upload || download"</td>
			<td rowspan="2">Promise&#x3C;string | UploadResult&#x3E; | Error</td>
		</tr>
		<tr>
			<td>fileParams: url, [optional: file]</td>
		</tr>
</tbody>
</table>

## License

The MIT License (MIT)

Copyright (C) «2022» by Trofim Iv

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.