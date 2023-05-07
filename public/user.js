var userManager = (function () {

//    var encKey = "";
//    var aesKey = "";
//    var setupControles = {};
//    var widget = {};
    
    return {
        init : async function (id, serverUrl) {
            userManager.encKey = "1234567891234567";
            userManager.aesKey = "xx35f242a46d67eeb74aabc37d5e5d05";
            
            userManager.id = id;
            userManager.serverUrl = serverUrl;
            
            userManager.widget = document.getElementById(this.id);
            
            userManager.setupControlesFunc();
            userManager.setupLogoutLink();
            
            userManager.setupEvents();
            
            userManager.isLoggedIn();


        },
        isLoggedIn : function(){
            var auth = userManager.getAuthKey();
            var email = userManager.getUserEmail();
            if(auth != "" && email != "" && email != null){
                return true;
            }else{
                userManager.logOut();
                return false;
            }
        },
        setupCss : function(){
            document.body.classList.add("dashboard");
        },
        setupEvents : async function(){
            document.addEventListener('click', async function(e) {
                
                if(e.target.id == "reset-password"){
                    if(e)e.preventDefault();
                    var email = document.querySelector('#user-forgot-password').value;
                    //console.log("reset password for : "+ email);
                    var dataUrl = userManager.serverUrl+"/api/dashboard/reset/password?email="+email;
                    var responseJson = await userManager.fetchJson(dataUrl);
                    //console.log(responseJson);
                    document.querySelector('#user-manager-messages').innerHTML = "We have sent an email with a key that you can use to reset your password.";
                    
                }
                
                if(e.target.id == "logout-link"){
                    userManager.logOut();
                    //location.reload();
                    window.location.href = "/";
                }

                if(e.target.id == "register-user"){
                    var auth = userManager.getAuthKey();
                    var dataUrl = userManager.serverUrl+"/api/dashboard/register/account?auth=" + auth;
                    var responseJson = await userManager.fetchJson(dataUrl);
                    
                    console.log(responseJson);
                    if(responseJson.status == "true"){
                        window.location.href = "/public/dashboard.html";
                    }else{
                        alert(responseJson.message);
                    }
                }
                
                if(e.target.id == "reset-link"){
                    userManager.showLogin(["user-forgot-password","reset-password","reset-key-link"]);
                }
                
                if(e.target.id == "reset-key-link"){
                    userManager.showLogin(["user-forgot-password","loginpass","user-reset-key","reset-key"]);
                    document.querySelector('#loginpass').placeholder = "New password";
                    document.querySelector('#reset-key').value  = "Submit";
                }
                
                if(e.target.id == "reset-key"){
                    if(e)e.preventDefault();
                    
                    var email  = document.querySelector('#user-forgot-password').value;
                    var resetKey = document.querySelector('#user-reset-key').value;
                    var newPassword = document.querySelector('#loginpass').value;

                    if(newPassword == ""){
                        var dataUrl = userManager.serverUrl+"/api/dashboard/reset/key?email="+email+"&key="+resetKey;
                        var responseJson = await userManager.fetchJson(dataUrl);
                    }else{
                        
                        var encPassword = userManager.encryptUserAndPassword("nouser", newPassword, userManager.encKey);
                        
                        var dataUrl = userManager.serverUrl+"/api/dashboard/new/password?email="+email+"&key="+resetKey+"&newpassword="+encPassword;//newPassword;
                        var responseJson = await userManager.fetchJson(dataUrl);
                    }
                }
                
                if(e.target.id == "register-link"){
                    userManager.showLogin(["loginname","loginpass","register-user"]);
                }
                
            });
        },
        logOut : function(){
            userManager.eraseCookie('authkey', "/");
            userManager.eraseCookie('useremail', "/"); 
            
            userManager.eraseCookie('authkey', "/public");
            userManager.eraseCookie('useremail', "/public");
            
            document.body.classList.remove("dashboard");
        },
        hideLoginForm : function(){
            document.querySelector('#user-manager').style.display = "none";
        },
        submitLogin : async function (e) {
            if(e)e.preventDefault();
            var authKey = userManager.getAuthKey();
            var dataUrl = userManager.serverUrl+"/api/dashboard/domains?auth=" + authKey;
            var serverJson = null;
            try {
                serverJson = await userManager.fetchJson(dataUrl);                
            } catch (e) {
            }
            if(serverJson != null){
                if(serverJson.serverlist.length >= 0){
                    userManager.setupCss();   
                    userManager.hideLoginForm();
                    document.querySelector('#user-manager-messages').innerHTML = "";
                    if(document.querySelector('#dashboard-button')){
                        document.querySelector('#dashboard-button').click();   
                    }else{
                        window.location.href = "/public/dashboard.html";
                    }
                }
            }else{
                document.querySelector('#user-manager-messages').innerHTML = "Oops something went wrong are your password and email correct?";
                userManager.logOut();
            }
        },        
        setupLogoutLink : function(){
            var authKey = this.getAuthKey();
            if(authKey.length > 1){
                this.submitLogin();
            }else{
                this.setupLogin();   
            }
        },
        showLogin : function (excludeIdList) {
            var allIds = [ 
            "loginname",
            "loginpass",
            "user-forgot-password",
            "login-user",
            "register-user",
            "reset-password",
            "register-link",
            "reset-link",
            "login-link",
            "reset-key",
            "reset-key-link",
            "user-reset-key"
            ]
            for (var i = 0; i < allIds.length; i++) {
                if(excludeIdList.includes(allIds[i])){
                    document.querySelector('#'+allIds[i]).style.display = "block";
                }else{
                    document.querySelector('#'+allIds[i]).style.display = "none";
                }
            }
        },
        setupControlesFunc : function () {
            this.setupMessages = document.createElement("div");
            this.setupMessages.id = this.id + "-messages";
            this.widget.appendChild(this.setupMessages);
           
            this.setupControles = document.createElement("div");
            this.setupControles.classList = this.id + "-controles";
            this.widget.appendChild(this.setupControles);

        },
        setupLogin : function () {
            this.loginForm = document.createElement("form");
            this.loginForm.id = "loginform";
            var user = document.createElement("input");
            user.setAttribute('type', "text");
            user.setAttribute('name', "user");
            user.placeholder = "Email";
            user.id = "loginname";
            user.style.display = "block";
            var userforgotpassword = document.createElement("input");
            userforgotpassword.id = "user-forgot-password";
            userforgotpassword.placeholder = "Account email";
            userforgotpassword.setAttribute('type', "text");
            userforgotpassword.setAttribute('name', "userforgotpassword");
            userforgotpassword.style.display = "none";
            var ufpkip = document.createElement("input");
            ufpkip.id = "user-reset-key";
            ufpkip.placeholder = "Reset key";
            ufpkip.setAttribute('type', "text");
            ufpkip.setAttribute('name', "userresetkey");
            ufpkip.style.display = "none";
            var pass = document.createElement("input");
            pass.setAttribute('type', "password");
            pass.setAttribute('name', "pass");
            pass.placeholder = "Password";
            pass.id = "loginpass";
            pass.style.display = "block";
            var s = document.createElement("input");
            s.id = "login-user";
            s.setAttribute('type', "submit");
            s.setAttribute('value', "Login");
            s.addEventListener("click", this.submitLogin);
            var r = document.createElement("input");
            r.id = "register-user";
            r.setAttribute('type', "submit");
            r.setAttribute('value', "Register");
            r.style.display = "none";
            r.addEventListener("click", function(e){e.preventDefault();});
            var ufp = document.createElement("input");
            ufp.id = "reset-password";
            ufp.setAttribute('type', "submit");
            ufp.setAttribute('value', "Reset Password");
            ufp.style.display = "none";
            var ufpk = document.createElement("input");
            ufpk.id = "reset-key";
            ufpk.setAttribute('type', "submit");
            ufpk.setAttribute('value', "Reset Key");
            ufpk.style.display = "none";
            var rr = document.createElement("a");
            rr.innerText = "Register";
            rr.id = "register-link";
            rr.href = "#";
            var ra = document.createElement("a");
            ra.innerText = "Forgot Password";
            ra.id = "reset-link";
            ra.href = "#";
            var rl = document.createElement("a");
            rl.innerText = "Login";
            rl.id = "login-link";
            rl.href = "#";
            rl.style.display = "none";
            var rlrsk = document.createElement("a");
            rlrsk.innerText = "I got a reset key";
            rlrsk.id = "reset-key-link";
            rlrsk.href = "#";
            rlrsk.style.display = "none";
            var br1 = document.createElement("br");
            var br2 = document.createElement("br");
            var br3 = document.createElement("br");
            this.loginForm.appendChild(user);
            this.loginForm.appendChild(ufpkip);
            this.loginForm.appendChild(pass);
            this.loginForm.appendChild(userforgotpassword);
            this.loginForm.appendChild(s);
            this.loginForm.appendChild(r);
            this.loginForm.appendChild(ufp);
            this.loginForm.appendChild(ufpk);
            this.loginForm.appendChild(rlrsk);
            this.loginForm.appendChild(br1);
            this.loginForm.appendChild(rr);
            this.loginForm.appendChild(br2);
            this.loginForm.appendChild(ra);
            this.loginForm.appendChild(br3);
            this.loginForm.appendChild(rl);

            this.setupControles.appendChild(this.loginForm);
        },
        getUserAndPassFromCookie : function(){
            var cookieAuthKey = this.getCookie('authkey');
            var res = {}
            res.iscached = false;
            if(cookieAuthKey){
                var authKey = userManager.aesDecrypt(cookieAuthKey);
                var authKeyParts = authKey.split(":::::");
                if(authKeyParts.length > 1){
                    res.user =  authKeyParts[0];
                    res.pass =  authKeyParts[1];
                    res.iscached = true;
                }
            }
            return res;
        },
        getAuthKey : function (){
            var res = this.getUserAndPassFromCookie();
            var user = res.user;
            var pass = res.pass; 
            if(!res.iscached){
                var formData = new FormData(userManager.loginForm);
                user = formData.get("user");
                pass = formData.get("pass"); 
                if(!user || !pass)return "";
                var authKey = userManager.aesEncrypt(user+":::::"+pass);
                this.setCookie('authkey',authKey,1);
                this.setUserEmail(user);
            }
    
            return userManager.encryptUserAndPassword(user, pass, userManager.encKey);
        },
        setUserEmail : function(userEmail){
            this.setCookie('useremail',userEmail,1);
        },
        getUserEmail : function(){
            return this.getCookie('useremail');
        },
        aesDecrypt : function(cryptText){
            var key = CryptoJS.enc.Utf8.parse('b75524255a7f54d2726a951bb39204df');
            var iv  = CryptoJS.enc.Utf8.parse('1583288699248111');
            var cipherParams = CryptoJS.lib.CipherParams.create({
                 ciphertext: CryptoJS.enc.Base64.parse(cryptText )
            });
            var decryptedFromText = CryptoJS.AES.decrypt(cipherParams, key, { iv: iv});
            return decryptedFromText.toString(CryptoJS.enc.Utf8);
        },
        aesEncrypt : function(plainText){
            
            var key = CryptoJS.enc.Utf8.parse('b75524255a7f54d2726a951bb39204df');
            var iv  = CryptoJS.enc.Utf8.parse('1583288699248111');
            var text = plainText;
            var encryptedCP = CryptoJS.AES.encrypt(text, key, { iv: iv });
            var cryptText = encryptedCP.toString();
            return cryptText;
        },
        encryptString : function(string, encKey){
          var iv = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
          var salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
          var aesUtil = new AesUtil(128, 1000);
          var ciphertext = aesUtil.encrypt(salt, iv, encKey, string);
          var aesPassword = (iv + "::" + salt + "::" + ciphertext);
          var password = btoa(aesPassword);
          return password;
        },
        encryptUserAndPassword : function(user, pass, encKey){
            var iv = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
            var salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
            var aesUtil = new AesUtil(128, 1000);
            var ciphertext = aesUtil.encrypt(salt, iv, encKey, user+":::::"+pass+":::::"+Date.now());
            var aesPassword = (iv + "::" + salt + "::" + ciphertext);
            var password = btoa(aesPassword);
            return password;
        },
        fetchJson : async function(url){
            const response = await fetch(url);
            response.ok;     
            response.status; 
            const json = await response.json();
            return json;
        },
        setCookie : function (name,value,days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days*24*60*60*1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "")  + expires + "; path=/";
        },
        
        getCookie : function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        },
        
        eraseCookie: function(name, path) {
            //document.cookie = name + '=; Path=' + path + '; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            var value = "";
            document.cookie = name + "=" + (value || "")  + '; Expires=Thu, 01 Jan 1970 00:00:01 GMT;' + "; path="+path;
        }
    }    
})();