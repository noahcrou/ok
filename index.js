var m = class extends HTMLElement {
    constructor() {
        super();
        this._visible = !0
    }
    static get observedAttributes() {
        return []
    }
    _render() {}
    attributeChangedCallback(e, t, i) {
        this._onAttributeChanged(e, t, i)
    }
    _onAttributeChanged(e, t, i) {}
    destroy() {}
    get visible() {
        return this._visible
    }
    set visible(e) {
        this._visible !== e && (this._visible = e,
        this._visible ? this.classList.remove("invisible") : this.classList.add("invisible"))
    }
}
;
window.customElements.define("a-component", m);
var u = class extends m {
    constructor() {
        super();
        this._titleIcon = document.createElement("span"),
        this._titleIcon.classList.add("icon", "title-icon"),
        this.appendChild(this._titleIcon),
        this._titleIconText = "",
        this._exit = document.createElement("span"),
        this._exit.classList.add("icon", "exit"),
        this._exit.textContent = "close",
        this.appendChild(this._exit),
        this._onExitClicked = this._onExitClicked.bind(this),
        this._exit.addEventListener("click", this._onExitClicked)
    }
    _onExitClicked(e) {
        this._closeSelf()
    }
    _closeSelf() {
        let e = this.closest("dialog");
        e && (e.classList.add("invisible"),
        e.ontransitionend = ()=>{
            e.ontransitionend = null,
            e.close()
        }
        )
    }
    async initialize(...e) {
        return this._titleIcon.textContent = this._titleIconText,
        !0
    }
    destroy() {
        this._exit.removeEventListener("click", this._onExitClicked)
    }
    get titleIcon() {
        return this._titleIconText
    }
    set titleIcon(e) {
        this._titleIconText
    }
}
;
window.customElements.define("a-dialog", u);
var A = class extends u {
    constructor() {
        super();
        this._username = document.createElement("span"),
        this._username.classList.add("username"),
        this.appendChild(this._username),
        this._email = document.createElement("span"),
        this.appendChild(this._email),
        this._signUp = document.createElement("button"),
        this._signUp.style.width = "150px",
        this._signUp.style.fontWeight = "700",
        this._signUp.textContent = "Sign Up",
        this.appendChild(this._signUp),
        this._signIn = document.createElement("button"),
        this._signIn.style.width = "150px",
        this._signIn.textContent = "Sign In",
        this._signIn.style.fontWeight = "700",
        this.appendChild(this._signIn),
        this._signOut = document.createElement("button"),
        this._signOut.textContent = "Sign Out",
        this._signOut.style.fontWeight = "700",
        this._signOut.style.width = "150px",
        this.appendChild(this._signOut);
        let e = document.createElement("button");
        if (e.textContent = "Membership Information",
        e.style.fontWeight = "700",
        e.style.width = "150px",
        e.addEventListener("click", ()=>{
            o.viewMembership()
        }
        ),
        this.appendChild(e),
        n?.self?.tier != 1) {
            let t = document.createElement("button");
            t.textContent = "Subscribe with Patreon",
            t.style.fontWeight = "700",
            t.style.width = "200px",
            t.addEventListener("click", ()=>{
                let a = "https://www.patreon.com/sexyai";
                window.open(a, "_blank").focus()
            }
            ),
            this.appendChild(t);
            let i = document.createElement("button");
            i.textContent = `Subscribe with \r
Credit or Debit Card`,
            i.style.width = "250px",
            i.style.fontWeight = "700",
            i.addEventListener("click", async()=>{
                let a = !0;
                a = await n.checkCCBAllowed(),
                a ? o.viewCcbill() : o.info("Credit and debit card processing is not currently available. Please use Patreon or email us for more options.")
            }
            ),
            this.appendChild(i)
        }
        this._message = document.createElement("span"),
        this._message.innerHTML = "<br/><br/><a href='https://discord.gg/sexyai'>Join our discord here: <u>https://discord.gg/sexyai</u></a><br/><br/>This site contains AI-generated adult imagery and intended for adult audiences.<br/>By accessing this site, I acknowledge that I am at least 18 years of age, and I agree to abide by the Terms of Service.<br/><br/>Are you a web developer or AI engineer and want to join the sexy.ai team? Email us: <a href='mailto:support@sexy.ai'>support@sexy.ai</a><br/><br/>",
        this.appendChild(this._message),
        this.tierLevel = document.createElement("span"),
        this.appendChild(this.tierLevel),
        this._contact = document.createElement("span"),
        this._contact.classList.add("contact"),
        this._contact.textContent = "CONTACT US",
        this.appendChild(this._contact),
        this._terms = document.createElement("span"),
        this._terms.classList.add("terms"),
        this._terms.textContent = "terms of service",
        this.appendChild(this._terms),
        this._privacy = document.createElement("span"),
        this._privacy.classList.add("privacy"),
        this._privacy.textContent = "privacy policy",
        this.appendChild(this._privacy),
        this._onClick = this._onClick.bind(this),
        this.addEventListener("click", this._onClick),
        this._onAuthenticate = this._onAuthenticate.bind(this),
        n.application.addEventListener("authenticate", this._onAuthenticate)
    }
    _invalidate() {
        n.isAuthenticated ? (this._username.textContent = n.self.username,
        this._username.classList.remove("invisible"),
        this._email.textContent = n.self.email,
        this._email.classList.remove("invisible"),
        this._signUp.classList.add("invisible"),
        this._signIn.classList.add("invisible"),
        this._signOut.classList.remove("invisible")) : (this._username.classList.add("invisible"),
        this._email.classList.add("invisible"),
        this._signUp.classList.remove("invisible"),
        this._signIn.classList.remove("invisible"),
        this._signOut.classList.add("invisible"));
        let e = "<a href='https://discord.gg/sexyai'>Join our discord here: <u>https://discord.gg/sexyai</u></a>";
        n?.self && (n.getTier() < 1 ? this.tierLevel.innerHTML = "Not a Pro Member. Please consider subscribing <3. Your support helps us make it better.<br/><br/>Please email us at <a href='mailto:support@sexy.ai'></u>support@sexy.ai</u></a> if you have any questions or suggestions." : this.tierLevel.innerHTML = "Pro Membership Active. <3 Thank you for your support.<br/><br/>Please email us at <a href='mailto:support@sexy.ai'></u>support@sexy.ai</u></a> if you have any questions or suggestions."),
        this._message.innerHTML = e
    }
    async initialize() {
        return super.initialize(),
        this._invalidate(),
        !0
    }
    _onClick(e) {
        let t = e.target;
        t === this._signUp ? o.signUp() : t === this._signIn ? o.signIn() : t === this._signOut ? n.deauthenticateUser() : t === this._contact ? o.contact() : t === this._terms ? o.terms() : t === this._privacy && o.privacy()
    }
    _onAuthenticate() {
        this._invalidate()
    }
    destroy() {
        super.destroy(),
        n.application.removeEventListener("authenticate", this._onAuthenticate),
        this.removeEventListener("click", this._onClick)
    }
}
;
window.customElements.define("a-account", A);
var b = class extends m {
    constructor() {
        super();
        this._label = document.createElement("span"),
        this.appendChild(this._label),
        this._textInput = document.createElement("input"),
        this._textInput.autocapitalize = "none",
        this._textInput.type = "text",
        this.appendChild(this._textInput)
    }
    static get observedAttributes() {
        return ["label", "value", "type"]
    }
    _onAttributeChanged(e, t, i) {
        e === "label" ? this.label = i : e === "value" ? this._textInput.value = i : e === "type" ? this._textInput.type = i : e === "autofocus" && (this.autofocus = Boolean(i))
    }
    select() {
        this._textInput.select()
    }
    focus() {
        this._textInput.focus()
    }
    get type() {
        return this._textInput.type
    }
    set type(e) {
        this._textInput.type = e
    }
    get inputMode() {
        return this._textInput.inputMode
    }
    set inputMode(e) {
        this._textInput.inputMode = e
    }
    get placeholder() {
        return this._textInput.placeholder
    }
    set placeholder(e) {
        this._textInput.placeholder = e
    }
    get value() {
        return this._textInput.value
    }
    set value(e) {
        this._textInput.value !== e && (this._textInput.value = e)
    }
    get label() {
        return this._label.innerText
    }
    set label(e) {
        this._label.innerText !== e && (this._label.innerText = e)
    }
    get readonly() {
        return this._textInput.readOnly
    }
    set readonly(e) {
        this._textInput.readOnly = e
    }
    get min() {
        return this._textInput.min
    }
    set min(e) {
        this._textInput.min = e
    }
    get max() {
        return this._textInput.max
    }
    set max(e) {
        this._textInput.max = e
    }
    get step() {
        return this._textInput.step
    }
    set step(e) {
        this._textInput.step = e
    }
}
;
window.customElements.define("a-text-input", b);
var L = class extends u {
    constructor() {
        super();
        this._step = 0;
        this.debounce = !1;
        this._form = document.createElement("form"),
        this.appendChild(this._form),
        this._email = new b,
        this._email.label = "email address",
        this._form.appendChild(this._email),
        this._next = document.createElement("button"),
        this._next.type = "submit",
        this._next.disabled = !0,
        this._next.innerHTML = "<span>next</span>",
        this._form.appendChild(this._next),
        this._otp = new b,
        this._otp.label = "auth code emailed to you",
        this._form.appendChild(this._otp),
        this._finish = document.createElement("button"),
        this._finish.type = "submit",
        this._finish.disabled = !0,
        this._finish.innerHTML = "<span>sign in</span>",
        this._form.appendChild(this._finish),
        this._resend = document.createElement("span"),
        this._resend.innerHTML = "<u>Resend code.</u><br/>(Check your SPAM Folder)",
        this._form.appendChild(this._resend),
        this._onInput = this._onInput.bind(this),
        this.addEventListener("input", this._onInput),
        this._onSubmit = this._onSubmit.bind(this),
        this.addEventListener("submit", this._onSubmit),
        this._onResend = this._onResend.bind(this),
        this._resend.addEventListener("click", this._onResend),
        this._invalidate()
    }
    async _invalidate() {
        this._step === 0 ? (this._email.classList.remove("invisible"),
        this._next.classList.remove("invisible"),
        this._otp.classList.add("invisible"),
        this._finish.classList.add("invisible"),
        this._resend.classList.add("invisible")) : this._step === 1 && (this._email.classList.add("invisible"),
        this._next.classList.add("invisible"),
        this._otp.classList.remove("invisible"),
        this._finish.classList.remove("invisible"),
        this._resend.classList.remove("invisible"))
    }
    _onInput() {
        this._next.disabled = !(this._email.value.trim().length > 0),
        this._finish.disabled = !(this._otp.value.trim().length > 0)
    }
    async _onSubmit(e) {
        if (e.preventDefault(),
        !this.debounce) {
            if (this._step === 0) {
                this.debounce = !0;
                let t = await n.requestOTP(this._email.value.trim(), !1);
                this.debounce = !1,
                !t || t.hasError ? o.info("There was an error.<br/>" + t?.errorMessage) : (this._step = 1,
                this._invalidate())
            } else if (this._step == 1) {
                this.debounce = !0;
                let t = await n.authenticateUser(this._email.value.trim(), this._otp.value.trim());
                await n.getSelfUser(),
                this.debounce = !1,
                t.hasError ? o.info(t.errorMessage) : (this._closeSelf(),
                o.closeApplicationDialog(),
                o.info("You are signed in... Enjoy!", 1500))
            }
        }
    }
    _onResend() {
        n.requestOTP(this._email.value.trim(), !1),
        o.info("Check your email for a new code")
    }
    async initialize() {
        return super.initialize(),
        !0
    }
    destroy() {
        super.destroy(),
        this.removeEventListener("input", this._onInput),
        this.removeEventListener("submit", this._onSubmit),
        this._resend.removeEventListener("click", this._onResend)
    }
}
;
window.customElements.define("a-sign-in", L);
var S = class extends u {
    constructor() {
        super();
        this._step = 0;
        this.debounce = !1;
        let e = document.createElement("span");
        e.innerHTML = "A 5 digit verification code will be sent to your email.<br/>Do not put in a fake email address.",
        this._form = document.createElement("form"),
        this.appendChild(this._form),
        this._form.appendChild(e),
        this._username = new b,
        this._username.label = "username",
        this._form.appendChild(this._username),
        this._email = new b,
        this._email.type = "email",
        this._email.label = "email address",
        this._form.appendChild(this._email),
        this._next = document.createElement("button"),
        this._next.type = "submit",
        this._next.disabled = !0,
        this._next.innerHTML = "<span>next</span>",
        this._form.appendChild(this._next),
        this._otp = new b,
        this._otp.label = "auth code emailed to you",
        this._form.appendChild(this._otp),
        this._finish = document.createElement("button"),
        this._finish.type = "submit",
        this._finish.disabled = !0,
        this._finish.innerHTML = "<span>sign up</span>",
        this._form.appendChild(this._finish),
        this._resend = document.createElement("span"),
        this._resend.textContent = "Didn't receive a code?",
        this._form.appendChild(this._resend),
        this._onInput = this._onInput.bind(this),
        this.addEventListener("input", this._onInput),
        this._onSubmit = this._onSubmit.bind(this),
        this.addEventListener("submit", this._onSubmit),
        this._onResend = this._onResend.bind(this),
        this._resend.addEventListener("click", this._onResend),
        this._invalidate()
    }
    async _invalidate() {
        this._step === 0 ? (this._email.classList.remove("invisible"),
        this._username.classList.remove("invisible"),
        this._next.classList.remove("invisible"),
        this._otp.classList.add("invisible"),
        this._finish.classList.add("invisible"),
        this._resend.classList.add("invisible")) : this._step === 1 && (this._email.classList.add("invisible"),
        this._username.classList.add("invisible"),
        this._next.classList.add("invisible"),
        this._otp.classList.remove("invisible"),
        this._finish.classList.remove("invisible"),
        this._resend.classList.remove("invisible"))
    }
    _onInput() {
        this._next.disabled = !(this._email.value.trim().length > 0 && this._username.value.trim().length > 0),
        this._finish.disabled = !(this._otp.value.trim().length > 0)
    }
    async _onSubmit(e) {
        if (e.preventDefault(),
        !this.debounce) {
            if (this._step === 0) {
                this.debounce = !0;
                let t = await n.requestOTP(this._email.value.trim(), !0);
                this.debounce = !1,
                !t && t.hasError ? o.info("There was an error.<br/>" + t?.errorMessage) : (this._step = 1,
                this._invalidate())
            } else if (this._step == 1) {
                this.debounce = !0;
                let t = await n.createUser(this._email.value.trim(), this._username.value.trim(), this._otp.value.trim());
                this.debounce = !1,
                t.hasError ? o.info(t.errorMessage) : (this._closeSelf(),
                o.closeApplicationDialog(),
                o.info("You are signed in... Enjoy!", 1500))
            }
        }
    }
    _onResend() {
        n.requestOTP(this._email.value.trim(), !0),
        o.info("Check your email for a new code")
    }
    async initialize() {
        return super.initialize(),
        !0
    }
    destroy() {
        super.destroy(),
        this.removeEventListener("input", this._onInput),
        this.removeEventListener("submit", this._onSubmit),
        this._resend.removeEventListener("click", this._onResend)
    }
}
;
window.customElements.define("a-sign-up", S);
var f = class {
    static formatTimeFromNow(s, e=Date.now()) {
        let t = e - new Date(s).getTime()
          , i = Math.abs(t);
        for (let a of this.TIME_INTERVALS)
            if (i >= a.ge) {
                let r = Math.round(Math.abs(t) / a.divisor)
                  , l = t < 0;
                return a.unit ? this.TIME_FORMATTER.format(l ? r : -r, a.unit) : a.text
            }
    }
    static formatCount(s) {
        return this.COUNT_FORMATTER.format(s)
    }
    static getImageUrl50pct(s) {
        let e = s;
        return s.includes(".jpg") ? e = s.replace(".jpg", "-s1.jpg") : e = s.replace(".webp", "-50pct.webp"),
        e
    }
    static getImageUrl25pct(s) {
        let e = s;
        return s.includes(".jpg") ? e = s.replace(".jpg", "-25pct.jpg") : e = s.replace(".webp", "-25pct.webp"),
        e
    }
    static getImageUrlNoExtension(s) {
        let e = s;
        return e = e.replace(".jpg", ""),
        e = e.replace(".webp", ""),
        e
    }
}
  , c = f;
c.SECOND = 1e3,
c.MINUTE = 60 * f.SECOND,
c.HOUR = 60 * f.MINUTE,
c.DAY = 24 * f.HOUR,
c.WEEK = 7 * f.DAY,
c.MONTH = 30 * f.DAY,
c.YEAR = 365 * f.DAY,
c.TIME_INTERVALS = [{
    ge: f.YEAR,
    divisor: f.YEAR,
    unit: "year"
}, {
    ge: f.MONTH,
    divisor: f.MONTH,
    unit: "month"
}, {
    ge: f.WEEK,
    divisor: f.WEEK,
    unit: "week"
}, {
    ge: f.DAY,
    divisor: f.DAY,
    unit: "day"
}, {
    ge: f.HOUR,
    divisor: f.HOUR,
    unit: "hour"
}, {
    ge: f.MINUTE,
    divisor: f.MINUTE,
    unit: "minute"
}, {
    ge: 30 * f.SECOND,
    divisor: f.SECOND,
    unit: "seconds"
}, {
    ge: 0,
    divisor: 1,
    text: "just now"
}],
c.TIME_FORMATTER = new Intl.RelativeTimeFormat(void 0,{
    numeric: "auto"
}),
c.COUNT_FORMATTER = Intl.NumberFormat("en", {
    notation: "compact"
});
var x = class extends m {
    constructor(e=null) {
        super();
        this._folder = e,
        this._folder && (this._name = document.createElement("span"),
        this._name.classList.add("name"),
        this._name.textContent = this._folder.name,
        this.appendChild(this._name),
        this._sampleImages = document.createElement("div"),
        this._sampleImages.classList.add("sample-images"),
        this.appendChild(this._sampleImages),
        this.initialize())
    }
    async initialize() {
        this._folder.sampleImageIDs.length > 0 && await this._folder.sampleImageIDs.forEach(async e=>{
            let t = await n.getImage(e);
            if (t) {
                let i = c.getImageUrl25pct(t.url);
                this._sampleImages.innerHTML += `<img src="${i}">`
            }
        }
        )
    }
}
;
window.customElements.define("a-curate-folders-item", x);
var C = class extends u {
    constructor() {
        super();
        this._imageID = null,
        this._selectedFolderID = null,
        this._image = document.createElement("img"),
        this.appendChild(this._image),
        this._folders = document.createElement("div"),
        this.appendChild(this._folders),
        this._save = document.createElement("span"),
        this._save.classList.add("icon", "save", "disabled"),
        this._save.textContent = "beenhere",
        this.appendChild(this._save),
        this._onClick = this._onClick.bind(this),
        this.addEventListener("click", this._onClick)
    }
    async initialize(e) {
        if (super.initialize(),
        e !== null) {
            let t = await n.getImage(e);
            if (t)
                return this._imageID = e,
                this._image.src = t.url,
                this._image.onload = i=>{
                    let a = i.target;
                    a.classList.remove("loading"),
                    a.onload = void 0
                }
                ,
                await this._buildFolders(),
                !0
        }
        return !1
    }
    async _buildFolders() {
        n.selfFolders.forEach(async e=>{
            let t = new x(e);
            t.dataset.selectFolderId = e.id,
            this._folders.appendChild(t)
        }
        )
    }
    async _onClick(e) {
        for (let i of this._folders.children)
            i.classList.remove("selected");
        let t = e.target;
        t.constructor === x ? (this._selectedFolderID = t.getAttribute("data-select-folder-id"),
        t.classList.add("selected"),
        this._save.classList.remove("disabled")) : t === this._save ? (await n.addImageToSelfFolder(this._selectedFolderID, this._imageID),
        this._closeSelf()) : (this._selectedFolderID = null,
        this._save.classList.add("disabled"))
    }
    destroy() {
        super.destroy(),
        this.removeEventListener("click", this._onClick)
    }
}
;
window.customElements.define("a-add-image-to-self-folder", C);
var T = class extends u {
    constructor() {
        super();
        this._iframe = document.createElement("iframe"),
        this._iframe.src = "./contact.html",
        this.appendChild(this._iframe)
    }
    async initialize() {
        return super.initialize(),
        !0
    }
    destroy() {
        super.destroy()
    }
}
;
window.customElements.define("a-contact", T);
var M = class extends u {
    constructor() {
        super();
        this._form = document.createElement("form"),
        this.appendChild(this._form),
        this._folderName = new b,
        this._folderName.label = "folder name",
        this._form.appendChild(this._folderName),
        this._createFolder = document.createElement("button"),
        this._createFolder.type = "submit",
        this._createFolder.disabled = !0,
        this._createFolder.innerHTML = '<span class="icon">create_new_folder</span>',
        this._form.appendChild(this._createFolder),
        this._onInput = this._onInput.bind(this),
        this._onSubmit = this._onSubmit.bind(this),
        this._form.addEventListener("input", this._onInput),
        this._form.addEventListener("submit", this._onSubmit)
    }
    async initialize() {
        return super.initialize(),
        !0
    }
    destroy() {
        super.destroy(),
        this._form.removeEventListener("input", this._onInput),
        this._form.removeEventListener("submit", this._onSubmit)
    }
    _onInput(e) {
        this._folderName.value.trim().length > 0 ? this._createFolder.disabled = !1 : this._createFolder.disabled = !0
    }
    async _onSubmit(e) {
        e.preventDefault(),
        n.createSelfFolder(this._folderName.value.trim()),
        this._closeSelf()
    }
}
;
window.customElements.define("a-create-folder", M);
var P = class extends u {
    constructor() {
        super();
        let e = document.createElement("span");
        e.style.margin = "20px",
        e.style.display = "block",
        e.style.float = "center";
        let t = "<p><span style='font-size:16px'><strong>Subscribe with Credit Card</strong></span></p><ul><li>Pricing: USD $10.00/mo</li><li>Visa, Mastercard, and Discover Accepted</li><li>CCBill.com *x64Host LLC will appear on your Cardholder statement</li></ul>";
        t += "<br/><br/>By subscribing you will be supporting the AI development, community, and unlocking access to many new features, including image variations and unlimited fast generation. <br/><br/>If you would like to cancel your subscription please contact CCBill here: support@ccbill.com.",
        e.innerHTML = t,
        this.appendChild(e);
        {
            let i = document.createElement("button");
            i.style.top = "320px",
            i.style.height = "30px",
            i.style.margin = "20px",
            i.style.position = "absolute",
            i.textContent = "Subscribe With CCBill",
            i.addEventListener("click", async()=>{
                if (!n.isAuthenticated) {
                    await o.info("Please sign in before upgrading to Pro membership."),
                    o.closeApplicationDialog(),
                    o.viewAccount();
                    return
                }
                if (n.getTier() > 0) {
                    await o.info("Your account is already a Pro member. No upgrade available.");
                    return
                }
                let a = "https://api.ccbill.com/wap-frontflex/flexforms/019476ee-3a8a-43fb-aeaf-0743bb71cd14";
                n?.self?.userID && (a += "?uid=" + n?.self?.userID),
                window.open(a, "_blank").focus()
            }
            ),
            this.appendChild(i)
        }
    }
    async initialize() {
        return super.initialize(),
        !0
    }
    destroy() {
        super.destroy()
    }
}
;
window.customElements.define("a-ccbill", P);
var D = class extends u {
    constructor() {
        super();
        let e = document.createElement("span");
        e.style.margin = "20px",
        e.style.display = "block",
        e.style.float = "center";
        let t = "<p><span style='font-size:16px'><strong>Tier 1 Pro Membership features</strong></span></p><ul><li>Pricing: USD $14.99/mo</li><li>Unlimited image generation</li><li>Fast queue</li><li>Video generation</li><li>Generate Batch of 4 Images</li><li>Support us to improve the project <3</li></ul><p><span style='font-size:16px'><strong>Tier 2 Pro Membership features</strong></span></p><ul><li>Pricing: USD $29.99/mo</li><li>Unlimited image generation</li><li>Fastest priority queue</li><li>Video generation</li><li>Generate Batch of 4 Images</li><li>Early feature access</li><li>Support us to improve the project <3</li></ul><p><span style='font-size:16px'><strong>Free Membership features</strong></span></p><ul><li>Pricing: Free</li><li>Unlimited image generation</li><li>Generate Batch of 2 Images</li></ul>";
        e.innerHTML = t,
        this.appendChild(e);
        {
            let a = document.createElement("button");
            a.style.top = "520px",
            a.style.height = "30px",
            a.style.margin = "20px",
            a.style.position = "absolute",
            a.textContent = "Delete Account",
            a.addEventListener("click", async()=>{
                let r = await n.getSelfUser();
                if (!r || r?.isAuthenticated != !0) {
                    await o.info("Please log in first.");
                    return
                }
                await o.confirm("Are you sure you want to delete your account with email: " + r.email + "?") && await o.confirm("You have selected to delete all images and the account for email: " + r.email + ".<br/><br/>This action cannot be undone.<br/><br/>Please confirm you want to delete this account.") && (await n.deleteUser(r.email) ? await o.info("The user has been deleted.") : await o.info("ERROR"),
                await n.deauthenticateUser())
            }
            ),
            this.appendChild(a)
        }
        {
            let a = document.createElement("button");
            a.style.top = "520px",
            a.style.left = "120px",
            a.style.height = "30px",
            a.style.margin = "20px",
            a.style.position = "absolute",
            a.textContent = "Delete Images",
            a.addEventListener("click", async()=>{
                let r = await n.getSelfUser();
                if (!r || r?.isAuthenticated != !0) {
                    await o.info("Please log in first.");
                    return
                }
                await o.confirm("Are you sure you want to delete all your images?<br/>Email: " + r.email) && await o.confirm("You have selected to delete all images and the account for email: " + r.email + ".<br/><br/>This action cannot be undone.<br/><br/>Please confirm you want to delete all images.") && await o.info("Not implemented yet.")
            }
            )
        }
        let i = n.self;
        if (i && i?.tier > 0) {
            let a = document.createElement("button");
            a.style.top = "520px",
            a.style.left = "120px",
            a.style.height = "30px",
            a.style.margin = "20px",
            a.style.position = "absolute",
            a.textContent = "Cancel Membership",
            a.addEventListener("click", async()=>{
                let r = await n.getSelfUser();
                if (!r || r?.isAuthenticated != !0) {
                    await o.info("Please log in first.");
                    return
                }
                if (r?.tier < 1) {
                    await o.info("You do not have an active membership.");
                    return
                }
                if (await o.confirm("Are you sure you want to cancel your Pro membership for email: " + r.email + "?")) {
                    let p = await n.cancelMembership(r.email);
                    await o.info("An email has been sent to you with instructions for how to cancel your account.")
                }
            }
            ),
            this.appendChild(a)
        }
    }
    async initialize() {
        return super.initialize(),
        !0
    }
    destroy() {
        super.destroy()
    }
}
;
window.customElements.define("a-membership", D);
var H = class extends u {
    constructor() {
        super();
        this._iframe = document.createElement("iframe"),
        this._iframe.src = "./models.html",
        this.appendChild(this._iframe)
    }
    async initialize() {
        return super.initialize(),
        !0
    }
    destroy() {
        super.destroy()
    }
}
;
window.customElements.define("a-models", H);
var R = class extends u {
    constructor() {
        super();
        this._iframe = document.createElement("iframe"),
        this._iframe.src = "./privacy.html",
        this.appendChild(this._iframe)
    }
    async initialize() {
        return super.initialize(),
        !0
    }
    destroy() {
        super.destroy()
    }
}
;
window.customElements.define("a-privacy", R);
var F = class extends u {
    constructor() {
        super();
        this._instruction = document.createElement("span"),
        this._instruction.classList.add("instruction"),
        this._instruction.textContent = "Write something descriptive and clever to create magic.",
        this.appendChild(this._instruction),
        this._onClick = this._onClick.bind(this),
        this.addEventListener("click", this._onClick)
    }
    async initialize() {
        return super.initialize(),
        !0
    }
    destroy() {
        super.destroy(),
        this.removeEventListener("click", this._onClick)
    }
    _onClick(e) {
        e.target.hasAttribute("data-prompt") && this._closeSelf()
    }
}
;
window.customElements.define("a-prompt-info", F);
var k = class extends u {
    constructor() {
        super();
        this._form = document.createElement("form"),
        this.appendChild(this._form),
        this._imageURL = new b,
        this._imageURL.style.width = "290px",
        this._imageURL.label = "image share url",
        this._form.appendChild(this._imageURL),
        this._copyURL = document.createElement("button"),
        this._copyURL.type = "submit",
        this._copyURL.innerHTML = '<span class="icon">content_copy</span>',
        this._form.appendChild(this._copyURL),
        this._onSubmit = this._onSubmit.bind(this),
        this._form.addEventListener("submit", this._onSubmit)
    }
    async initialize(e=null) {
        return super.initialize(),
        e !== null && (this._imageURL.value = "https://" + window.location.host + "/#ai_" + e,
        this._imageURL.select()),
        !0
    }
    destroy() {
        super.destroy(),
        this._form.removeEventListener("submit", this._onSubmit)
    }
    async _onSubmit(e) {
        e.preventDefault(),
        navigator.clipboard.writeText(this._imageURL.value),
        o.info("Copied to clipboard!", 500),
        setTimeout(()=>{
            this && this._closeSelf && this._closeSelf()
        }
        , 750)
    }
}
;
window.customElements.define("a-share-image", k);
var G = class extends u {
    constructor() {
        super();
        this._iframe = document.createElement("iframe"),
        this._iframe.src = "./terms.html",
        this.appendChild(this._iframe)
    }
    async initialize() {
        return super.initialize(),
        !0
    }
    destroy() {
        super.destroy()
    }
}
;
window.customElements.define("a-terms", G);
var O = class extends u {
    constructor() {
        super();
        this.imageInfo = null,
        this._form = document.createElement("form"),
        this.appendChild(this._form);
        let e = document.createElement("span");
        e.innerHTML = "Select Variation Amount:",
        e.style.flex = "0 0 auto",
        e.style.flexDirection = "column",
        this._form.appendChild(e);
        let t = document.createElement("span");
        t.style.flex = "0 0 auto",
        t.style.flexDirection = "column",
        this.numVaryAmount = document.createElement("input"),
        this.numVaryAmount.style.flex = "0 0 auto",
        this.numVaryAmount.style.flexDirection = "column",
        this.numVaryAmount.style.width = "220px",
        this.numVaryAmount.type = "range",
        this.numVaryAmount.min = "0.01",
        this.numVaryAmount.max = "1",
        this.numVaryAmount.step = "0.01",
        this.numVaryAmount.value = "0.10",
        this.numVaryAmount.style.margin = "0px",
        this.numVaryAmount.addEventListener("input", ()=>{
            t.innerHTML = (parseFloat(this.numVaryAmount.value) * 100).toFixed(0) + "%"
        }
        ),
        t.innerHTML = (parseFloat(this.numVaryAmount.value) * 100).toFixed(0) + "%",
        this._form.appendChild(this.numVaryAmount),
        this._form.appendChild(t);
        let i = document.createElement("button");
        i.style.width = "150px",
        i.style.fontWeight = "700",
        i.textContent = " Generate Variations",
        this._form.appendChild(i),
        this._onSubmit = this._onSubmit.bind(this),
        this._form.addEventListener("submit", this._onSubmit)
    }
    async initialize(e=null) {
        return super.initialize(),
        this.imageInfo = e,
        !0
    }
    destroy() {
        super.destroy()
    }
    async _onSubmit(e) {
        e.preventDefault(),
        this._closeSelf(),
        _.instance.view = "generate3",
        this.imageInfo != null && _.instance._generate3.GenerateVariations(this.imageInfo, parseFloat(this.numVaryAmount.value))
    }
}
;
window.customElements.define("a-variation-dialog", O);
var B = class extends u {
    constructor() {
        super();
        this.imageID = null;
        this.newJobMsg = null;
        this._image = document.createElement("img"),
        this._image.style.setProperty("--rotation", `${-20 + Math.random() * 40}deg`),
        this._image.classList.add("loading"),
        this._image.addEventListener("click", this._closeSelf),
        this.appendChild(this._image),
        this._report = document.createElement("span"),
        this._report.classList.add("icon", "report"),
        this._report.style.position = "absolute",
        this._report.style.left = "0rem",
        this._report.style.bottom = "0rem",
        this._report.style.padding = "16px",
        this._report.textContent = "outlined_flag",
        this.appendChild(this._report);
        {
            let e = document.createElement("span");
            e.classList.add("icon"),
            e.style.position = "absolute",
            e.style.right = "68px",
            e.style.bottom = "0rem",
            e.style.padding = "16px",
            e.style.color = "#cccccc",
            e.textContent = "tune",
            this.appendChild(e),
            e.addEventListener("click", async()=>{
                _.instance.view = "generate3";
                let t = await n.getImageInfo(this.imageID);
                t != null && await o.openVariationDialog(t),
                n.trackEvent("viarationButton_Click", {
                    userID: n?.self?.userID
                })
            }
            )
        }
        this._delete = document.createElement("span"),
        this._delete.classList.add("icon"),
        this._delete.style.position = "absolute",
        this._delete.style.left = "66px",
        this._delete.style.bottom = "0rem",
        this._delete.style.padding = "16px",
        this._delete.textContent = "delete",
        this._delete.addEventListener("click", async e=>{
            if (this.imageID != null)
                if (await n.deleteImage(this.imageID)) {
                    o.info("Your image has been deleted.");
                    let i = document.getElementById("img_" + this.imageID);
                    i && i?.src && (i.src = ""),
                    o.closeApplicationDialog()
                } else
                    o.info("Image not deleted. You may only delete your own images. Please log into the correct account.")
        }
        ),
        this.appendChild(this._delete);
        {
            let e = document.createElement("span");
            e.classList.add("icon"),
            e.style.position = "absolute",
            e.style.left = "0px",
            e.style.top = "0px",
            e.style.padding = "8px",
            e.style.color = "#cccccc",
            e.textContent = "info",
            this.appendChild(e),
            e.addEventListener("click", ()=>{
                this._promptInfo.style.display == "none" ? (this._promptInfo.style.display = "",
                localStorage.setItem("prompt_visible", "1")) : (this._promptInfo.style.display = "none",
                localStorage.setItem("prompt_visible", "0")),
                n.trackEvent("infoButton_Click", {
                    userID: n?.self?.userID
                })
            }
            )
        }
        this._save = document.createElement("span"),
        this._save.classList.add("icon", "save"),
        this._save.textContent = "folder_special",
        this.appendChild(this._save),
        this._share = document.createElement("span"),
        this._share.classList.add("icon", "share"),
        this._share.textContent = "send",
        this.appendChild(this._share),
        this._promptInfo = document.createElement("span"),
        localStorage.getItem("prompt_visible") == "1" ? this._promptInfo.style.display = "" : this._promptInfo.style.display = "none",
        this._promptInfo.style.position = "absolute",
        this._promptInfo.style.left = "0px",
        this._promptInfo.style.right = "0px",
        this._promptInfo.style.bottom = "56px",
        this._promptInfo.style.textAlign = "center",
        this._promptInfo.style.padding = "14px",
        this._promptInfo.style.paddingLeft = "18px",
        this._promptInfo.style.paddingRight = "18px",
        this._promptInfo.innerHTML = "",
        this._promptInfo.style.backgroundColor = "#00000000",
        this._promptInfo.style.color = "#eeeeee",
        this._promptInfo.style.textShadow = "-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5), 2px 2px 2px rgba(206,89,55,0)",
        this._promptInfo.addEventListener("click", ()=>{
            navigator.clipboard.writeText(this._promptString),
            o.info("Copied to clipboard!", 700)
        }
        ),
        this.appendChild(this._promptInfo)
    }
    async getBase64FromImageUrl(e) {
        let i = await (await fetch(e)).blob();
        return new Promise(a=>{
            let r = new FileReader;
            r.readAsDataURL(i),
            r.onloadend = ()=>{
                let l = r.result;
                a(l)
            }
        }
        )
    }
    downloadToJpg(e, t) {
        var i = new Image;
        i.crossOrigin = "anonymous",
        i.onload = function() {
            var a = document.createElement("canvas");
            a.width = i.naturalWidth,
            a.height = i.naturalHeight,
            a.getContext("2d").drawImage(i, 0, 0),
            a.toBlob(r=>{
                let l = new FileReader;
                l.readAsDataURL(r),
                l.onloadend = ()=>{
                    let p = l.result
                      , d = document.createElement("a");
                    d.href = p,
                    d.download = t + ".jpg",
                    d.click()
                }
            }
            , "image/jpeg", .95)
        }
        ,
        i.src = e
    }
    async initialize(e=null) {
        if (super.initialize(),
        n.isAuthenticated || this._save.classList.add("invisible"),
        this.newJobMsg = null,
        e !== null) {
            let t = await n.getImage(e);
            if (t) {
                this.imageID = e,
                this._image.src = t.url,
                this._image.onload = l=>{
                    let p = l.target;
                    p.classList.remove("loading"),
                    p.onload = void 0,
                    p.dataset.image = e,
                    this._save.dataset.addImageToFolder = e,
                    this._report.dataset.reportImage = e,
                    this._share.dataset.shareImage = e
                }
                ;
                let i = c.getImageUrlNoExtension(t.url) + ".json"
                  , a = await n.doLoadJSONString(i)
                  , r = JSON.parse(a);
                this._promptInfo.innerHTML = "<b>" + r.newJobMsg.prompt + "</b>",
                this._promptString = r.newJobMsg.prompt,
                this.newJobMsg = r.newJobMsg;
                {
                    let l = document.createElement("span");
                    l.classList.add("icon"),
                    l.style.position = "absolute",
                    l.style.left = "66px",
                    l.style.top = "1px",
                    l.style.padding = "8px",
                    l.style.color = "#cccccc",
                    l.textContent = "download",
                    this.append(l),
                    l.addEventListener("click", async()=>{
                        this.downloadToJpg(t.url, t.id)
                    }
                    )
                }
                return !0
            }
        }
        return !1
    }
    close() {
        this._closeSelf()
    }
    _closeSelf() {
        super._closeSelf(),
        window.location.hash = ""
    }
    destroy() {
        super.destroy()
    }
}
;
window.customElements.define("a-view-image", B);
var E = class extends m {
    constructor() {
        super()
    }
    static async viewImage(s=null) {
        return s !== null ? this._showApplicationDialog(B, s) : null
    }
    static async shareImage(s=null) {
        return s !== null ? this._showApplicationDialog(k, s) : null
    }
    static async promptInfo() {
        return this._showApplicationDialog(F)
    }
    static async contact() {
        return this._showApplicationDialog(T)
    }
    static async terms() {
        return this._showApplicationDialog(G)
    }
    static async privacy() {
        return this._showApplicationDialog(R)
    }
    static async models() {
        return this._showApplicationDialog(H)
    }
    static async viewMembership() {
        return this._showApplicationDialog(D)
    }
    static async viewCcbill() {
        return this._showApplicationDialog(P)
    }
    static async openVariationDialog(s) {
        return this._showApplicationDialog(O, s)
    }
    static async viewAccount() {
        return this._showApplicationDialog(A)
    }
    static async signUp() {
        return this._showApplicationDialog(S)
    }
    static async signIn() {
        return this._showApplicationDialog(L)
    }
    static async createFolder() {
        return this._showApplicationDialog(M)
    }
    static async addImageToSelfFolder(s) {
        return this._showApplicationDialog(C, s)
    }
    static async info(s="", e=0) {
        return this._showSystemDialog(s, !1, e)
    }
    static async confirm(s="") {
        return this._showSystemDialog(s)
    }
    static async _showSystemDialog(s, e=!0, t=0) {
        return new Promise(i=>{
            let a = document.createElement("dialog");
            a.classList.add("system-dialog", "invisible"),
            a.innerHTML = `
                <form method="dialog">
                    <section>
                        ${s}
                    </section>
                    <menu>
                        ${e ? '<button class="icon-button secondary" type="reset"><span class="icon">close</span></button>' : ""}
                        <button class="icon-button primary" type="submit"><span class="icon">check</span></button>
                    </menu>
                </form>
            `,
            document.body.appendChild(a),
            a.showModal(),
            setTimeout(()=>{
                a.classList.remove("invisible")
            }
            , 1);
            let r = !1
              , l = g=>{
                g.preventDefault(),
                r = !0,
                a.close()
            }
              , p = g=>{
                g.preventDefault(),
                a.close()
            }
              , d = g=>{
                a.removeEventListener("submit", l),
                a.removeEventListener("reset", p),
                a.removeEventListener("close", d),
                a.parentElement && a.remove(),
                i(r)
            }
            ;
            a.addEventListener("submit", l),
            a.addEventListener("reset", p),
            a.addEventListener("close", d),
            t > 0 && setTimeout(()=>{
                a.dispatchEvent(new Event("close"))
            }
            , t)
        }
        )
    }
    static async _showSystemPrompt(s, e="text", t=null) {
        return new Promise(i=>{
            let a = document.createElement("dialog");
            a.classList.add("system-dialog", "invisible"),
            a.innerHTML = `
                <form method="dialog">
                    <section>
                        ${s}
                    </section>
                    <section>
                        <input type="${e}"/>
                    </section>
                    <menu>
                        <button class="icon-button secondary" type="reset"><span class="icon">close</span></button>
                        <button class="icon-button primary" type="submit"><span class="icon">check</span></button>
                    </menu>
                    ${t !== null ? `<section>${t}</section>` : ""}
                </form>
            `,
            document.body.appendChild(a),
            a.showModal(),
            setTimeout(()=>{
                a.classList.remove("invisible")
            }
            , 1);
            let r = d=>{
                d.preventDefault(),
                a.close()
            }
              , l = d=>{
                d.preventDefault(),
                a.close()
            }
              , p = d=>{
                a.removeEventListener("submit", r),
                a.removeEventListener("reset", l),
                a.removeEventListener("close", p),
                a.parentElement && a.remove();
                let g = a.querySelector("input")?.value || null;
                g !== null && g.length === 0 && (g = null),
                i(g)
            }
            ;
            a.addEventListener("submit", r),
            a.addEventListener("reset", l),
            a.addEventListener("close", p)
        }
        )
    }
    static async checkForPro() {
        if (n?.isAuthenticated && n?.getTier() > 0)
            return !0;
        if (!n?.isAuthenticated)
            return await E.info("Please sign in to use this feature."),
            await E.viewAccount(),
            !1;
        let s = "https://api.ccbill.com/wap-frontflex/flexforms/019476ee-3a8a-43fb-aeaf-0743bb71cd14";
        n?.self?.userID && (s += "?uid=" + n?.self?.userID);
        let e = "https://patreon.com/sexyai";
        return await E.info(`Pro membership required for this feature.<br/><br/><button onclick='window.location.href="` + e + `";'><b>Subscribe with Patreon</b></button>`),
        !1
    }
    static closeApplicationDialog() {
        if (E.applicationDialog) {
            try {
                E.applicationDialog.close()
            } catch {}
            E.applicationDialog = null
        }
    }
    static async _showApplicationDialog(s, ...e) {
        let t = document.createElement("dialog");
        this.closeApplicationDialog(),
        E.applicationDialog = t,
        t.classList.add("application-dialog", "invisible");
        let i = new s;
        if (await i.initialize(...e)) {
            t.appendChild(i),
            document.body.appendChild(t),
            t.showModal(),
            setTimeout(()=>{
                t.classList.remove("invisible")
            }
            , 1);
            let r = l=>{
                t.removeEventListener("close", r),
                t.isConnected && (i.destroy(),
                t.remove())
            }
            ;
            return t.addEventListener("close", r),
            i
        } else
            return i.destroy(),
            t.remove(),
            null
    }
}
  , o = E;
o.applicationDialog = null;
window.customElements.define("a-dialogs", o);
var ne = class {
    static async initialize() {
        if (this._self = null,
        this._selfFolders = [],
        await this.getSelfUser(),
        this?._self?.isAuthenticated && await this.getSelfFolders(),
        document.dispatchEvent(new Event("appLoadComplete")),
        this.isAtLeast18 = !0,
        !this.isAtLeast18) {
            let e = "This site contains AI-generated adult imagery and intended for adult audiences.<br/>By accessing this site, I acknowledge that I am at least 18 years of age, and I agree to abide by the Terms of Service.<br/><br/><b>We are dedicated to LEGAL porn only!!</b><br/><br/>The AI algorithm used to generate the images on our site relies on complex mathematical models to generate unique outputs. If an image appears to resemble a person, it is simply a coincidence.";
            this.isAtLeast18 = await o.confirm(e),
            this.isAtLeast18 ? this.trackEvent("confirmedIsAtLeast18", {
                email: this?._self?.email,
                userID: this?._self?.userID
            }) : this.trackEvent("declinedIsAtLeast18", {
                email: this?._self?.email,
                userID: this?._self?.userID
            })
        }
        this.isAtLeast18 || (window.location.href = "https://bing.com");
        let s = (window.location.hash || "").replace("#ai_", "");
        s.length > 0 && o.viewImage(s),
        setInterval(()=>{
            this.getSelfUser()
        }
        , 6e4)
    }
    static async doLoadJSON(s) {
        try {
            return await (await fetch(s, {
                method: "GET"
            })).json()
        } catch {
            return null
        }
    }
    static async doLoadJSONString(s) {
        try {
            return await (await fetch(s, {
                method: "GET"
            })).text()
        } catch {
            return null
        }
    }
    static async doRequest(s, e) {
        try {
            let t = {}, i;
            return e.constructor === Blob ? (t = {
                "Content-Type": "application/octet-stream"
            },
            i = e) : i = JSON.stringify(e),
            await (await fetch(`https://api.sexy.ai/${s}`, {
                method: "POST",
                headers: t,
                body: i
            })).json()
        } catch {
            return null
        }
    }
    static trackEvent(s, e) {
        if (typeof window < "u" && window.gtag)
            try {
                window.gtag("event", s, e)
            } catch {}
    }
    static async requestOTP(s, e) {
        console.log("requestOTP: ", s);
        let t = await this.doRequest("requestOTP", {
            sessionID: this.sessionID || "",
            email: s,
            newUser: e
        });
        return this.trackEvent("requestOTP", {
            email: s
        }),
        t
    }
    static async createUser(s, e, t) {
        let i = localStorage.getItem("refList") || ""
          , a = await this.doRequest("createUser", {
            sessionID: this.sessionID || "",
            email: s,
            username: e,
            otp: t,
            isAtLeast18Confirmed: this.isAtLeast18,
            refList: i,
            rs: _.instance.rs || ""
        });
        return this.trackEvent("createUser", {
            email: s
        }),
        a && !a.hasError && a.payload.isAuthenticated && (this._self = a.payload),
        this.application.dispatchEvent(new Event("authenticate")),
        a
    }
    static async authenticateUser(s, e) {
        let t = await this.doRequest("authenticateUser", {
            sessionID: this.sessionID || "",
            email: s,
            otp: e,
            isAtLeast18Confirmed: this.isAtLeast18
        });
        return this.trackEvent("authenticateUser", {
            email: s
        }),
        t && !t.hasError && t.payload.isAuthenticated && (this._self = t.payload),
        this.application.dispatchEvent(new Event("authenticate")),
        t
    }
    static async deauthenticateUser() {
        this.sessionID = null,
        this.isAtLeast18 = null,
        window.location.reload()
    }
    static async getSelfUser() {
        this._lastSelfRetrieved = Date.now();
        let s = await this.doRequest("getSelfUser", {
            sessionID: this.sessionID || "",
            isAtLeast18Confirmed: this.isAtLeast18
        });
        return s.hasError ? (this._self = null,
        {
            sessionID: null,
            userID: null,
            email: null,
            username: null,
            isAuthenticated: !1,
            experienceCount: 0,
            tier: 0,
            merchantProcessor: null
        }) : (this._self = s.payload,
        this.sessionID = s.payload.sessionID,
        s.payload)
    }
    static async getSelfFolders() {
        let s = await this.doRequest("getSelfFolders", {
            sessionID: this.sessionID || ""
        });
        return s.hasError ? (this._selfFolders = [],
        []) : (this._selfFolders = s?.payload || [],
        s.payload)
    }
    static async createSelfFolder(s="") {
        let e = await this.doRequest("createSelfFolder", {
            sessionID: this.sessionID || "",
            name: s
        });
        return this.trackEvent("createSelfFolder", {
            userID: this?._self?.userID,
            folderName: s
        }),
        e.hasError ? null : (await this.getSelfFolders(),
        this.application.dispatchEvent(new Event("folderCreated")),
        e.payload)
    }
    static async addImageToSelfFolder(s, e) {
        let t = await this.doRequest("addImageToSelfFolder", {
            sessionID: this.sessionID || "",
            folderID: s,
            imageID: e
        });
        return this.trackEvent("addImageToSelfFolder", {
            userID: this?._self?.userID,
            folderID: s,
            imageID: e
        }),
        t.hasError ? null : t?.payload?.success || !1
    }
    static async removeImageFromSelfFolder(s, e) {
        let t = await this.doRequest("removeImageFromSelfFolder", {
            sessionID: this.sessionID || "",
            folderID: s,
            imageID: e
        });
        return this.trackEvent("removeImageFromSelfFolder", {
            userID: this?._self?.userID,
            folderID: s,
            imageID: e
        }),
        t.hasError ? null : t?.payload?.success || !1
    }
    static async generateImage(s="", e="", t=-1, i=20, a="Multi Porn", r=0, l=0) {
        let p = await this.doRequest("generateImage", {
            sessionID: this.sessionID || "",
            prompt: s,
            negprompt: e,
            seed: t,
            steps: i,
            modelName: a,
            subseed: r,
            subseed_strength: l
        });
        if (p.hasError == !1) {
            this.trackEvent("generateImage", {
                userID: this?._self?.userID,
                imageID: p?.payload?.imageID,
                prompt: s,
                seed: t,
                steps: i,
                modelName: a
            }),
            this.trackEvent("genImage_" + a, {});
            let d = this?._self?.tier || 0;
            this.trackEvent("genTier_" + d, {}),
            _?.instance?.rs && this.trackEvent("generateImage_" + (_?.instance?.rs || ""), {
                userID: this?._self?.userID,
                imageID: p?.payload?.imageID,
                prompt: s,
                seed: t,
                steps: i,
                modelName: a
            })
        }
        return p.hasError,
        p
    }
    static async generateVideo(s="", e=-1, t=20, i="model3", a="input1", r="preset1") {
        let l = await this.doRequest("generateVideo", {
            sessionID: this.sessionID || "",
            prompt: s,
            seed: e,
            steps: t,
            modelName: i,
            input: a,
            controlNetPreset: r
        });
        return l.hasError == !1 && this.trackEvent("generateVideo", {
            userID: this?._self?.userID,
            imageID: l?.payload?.imageID,
            prompt: s,
            seed: e,
            steps: t,
            modelName: i
        }),
        l.hasError,
        l
    }
    static async getImageStatus(s) {
        return await this.doRequest("getImageStatus", {
            sessionID: this.sessionID || "",
            imageID: s
        })
    }
    static async cancelMembership(s) {
        let e = await this.doRequest("cancelMembership", {
            sessionID: this.sessionID || "",
            user_email: s
        });
        return !!(e && e?.hasError == !1)
    }
    static async deleteUser(s) {
        let e = await this.doRequest("deleteUser", {
            sessionID: this.sessionID || "",
            user_email: s
        });
        return !!(e && e?.hasError == !1)
    }
    static async checkCCBAllowed() {
        let s = await this.doRequest("checkCCBAllowed", {
            sessionID: this.sessionID || ""
        });
        return s ? s?.allowed : !1
    }
    static async getImageInfo(s) {
        let e = await this.doRequest("getImageInfo", {
            id: s
        });
        return e.hasError || !e.payload ? null : e.payload
    }
    static async getLastCompletedImage(s=null) {
        return await this.doRequest("getLastCompletedImage", {
            sessionID: this.sessionID || "",
            mtype: s
        })
    }
    static async getLatestImages(s=null, e=null) {
        let t = await this.doRequest("getLatestImages", {
            fromTimestamp: s,
            limit: e
        });
        return t.hasError ? [] : t.payload
    }
    static async getSampleImages(s=null, e=null) {
        let t = await this.doRequest("getSampleImages", {
            limit: s,
            mtype: e || "image"
        });
        return t.hasError ? [] : t.payload
    }
    static async getLatestImagesWithSearch(s=null, e=null, t="", i=null, a=null) {
        let r = await this.doRequest("search_1", {
            skipCount: s,
            limit: e,
            searchText: t,
            userId: i,
            mtype: a || "image"
        });
        return r.hasError ? [] : r.payload
    }
    static async getMyCreations(s=null, e=null, t="", i=null, a=null, r=null) {
        let l = await this.doRequest("getMyCreations", {
            searchText: t,
            userID: i,
            mtype: r || "image",
            sessionID: a,
            skipCount: s,
            limit: e
        });
        return l.hasError ? [] : l.payload
    }
    static async getPatreonRedirectURL() {
        let s = await this.doRequest("getPatreonRedirectURL", {
            sessionID: this.sessionID || ""
        });
        return !s.hasError && s.payload && s.payload.length ? s.payload : null
    }
    static async getModels() {
        let s = await this.doRequest("getModels", {});
        return s.hasError ? [] : s.payload
    }
    static async getSystemFolders() {
        let s = await this.doRequest("getSystemFolders", {});
        return s.hasError ? [] : s.payload
    }
    static async getSystemPrompts() {
        let s = await this.doRequest("getSystemPrompts", {});
        return s.hasError ? [] : s.payload
    }
    static async getFolderItems(s, e=null, t=null) {
        let i = await this.doRequest("getFolderItems", {
            folderID: s,
            fromTimestamp: e,
            limit: t
        });
        return i.hasError ? [] : i.payload
    }
    static async reportImage(s=null) {
        let e = await this.doRequest("reportImage", {
            sessionID: this.sessionID || "",
            imageID: s
        });
        return this.trackEvent("reportImage", {
            userID: this?._self?.userID,
            imageID: s
        }),
        e.hasError ? !0 : e.payload
    }
    static async deleteImage(s=null) {
        let e = await this.doRequest("deleteImage", {
            sessionID: this.sessionID || "",
            imageID: s
        });
        return this.trackEvent("deleteImage", {
            userID: this?._self?.userID,
            imageID: s
        }),
        !e.hasError
    }
    static async getImage(s=null, e=!1) {
        let t = await this.doRequest("getImage", {
            id: s
        });
        return e == !1 && this.trackEvent("getImage", {
            userID: this?._self?.userID,
            imageID: s
        }),
        t.hasError ? null : t.payload
    }
    static get self() {
        return this._self
    }
    static getTier() {
        return ne?.self?.tier || 0
    }
    static get isAuthenticated() {
        return this?.self?.isAuthenticated || !1
    }
    static get selfFolders() {
        return this.isAuthenticated ? this._selfFolders : []
    }
    static get sessionID() {
        return this._sessionID || localStorage.getItem("sessionID") || null
    }
    static set sessionID(s) {
        s !== null ? (this._sessionID = s,
        localStorage.setItem("sessionID", s)) : (this._sessionID = null,
        localStorage.removeItem("sessionID"))
    }
    static get isAtLeast18() {
        return this._isAtLeast18 || localStorage.getItem("isAtLeast18") === "true" || null
    }
    static set isAtLeast18(s) {
        s !== null ? (this._isAtLeast18 = s,
        localStorage.setItem("isAtLeast18", String(s))) : (this._isAtLeast18 = null,
        localStorage.removeItem("isAtLeast18"))
    }
}
  , n = ne;
n._isAtLeast18 = !1,
n._sessionID = null;
var U = class extends m {
    constructor() {
        super()
    }
    initialize() {
        if (this.invalidate(),
        this._onAuthenticateSuccess = this._onAuthenticateSuccess.bind(this),
        document.addEventListener("authenticateSuccess", this._onAuthenticateSuccess),
        this._onAuthenticateFailure = this._onAuthenticateFailure.bind(this),
        document.addEventListener("authenticateFailure", this._onAuthenticateFailure),
        _.instance.getDemoCount() < 2) {
            let s = document.createElement("span");
            s.style.position = "absolute",
            s.style.width = "90%",
            s.style.left = "5%",
            s.style.padding = "10px",
            s.style.top = "30px",
            s.style.zIndex = "1000",
            s.style.backgroundColor = "#222222EA",
            s.style.boxShadow = "0 0 12px #000000",
            s.style.borderRadius = "20px",
            s.id = "generateHelpPopUp",
            s.innerHTML = `<br/><h3><center>AI Generated Porn</center></h3><h3><center>Try the I'm Feeling Lucky button!</center></h3><center>This website contains adult content generated by AI.<br/>You must be 18 years or older to access this website.</center><br/><center><button style="font-size:18px" onclick="globalThis.application.closeDemo()">I AM 18 Years or Older</button></center>`,
            this.appendChild(s)
        }
    }
    invalidate() {
        this.innerHTML = `
            <span data-account="true" class="icon" title="Account">account_circle</span>
             <!--   <span data-view="${"browse"}" class="icon" title="Browse">cloud_queue</span> -->
              <!--  <span data-view="${"generate"}" class="icon" title="Generate">auto_fix_high</span> -->
              <!--  <span data-view="${"generate2"}" class="icon" title="Generate2">brush</span> -->
                <span data-view="${"generate3"}" class="icon" title="Generate3">add_photo_alternate</span>
                <span data-view="${"generate4"}" class="icon" title="Generate4">video_call</span> 
              <!--  <span data-view="${"curate"}" class="icon" title="Curate">perm_media</span> -->
              <span data-view="${"browse2"}" class="icon" title="Browse2">search</span> 
             <!-- <span data-view="${"browse3"}" class="icon" title="Browse3">search</span>  -->
            `
    }
    setSelectedView(s) {
        for (let e = 0; e < this.children.length; e++) {
            let t = this.children[e];
            t.hasAttribute("data-view") && t.getAttribute("data-view") === s ? t.classList.add("selected") : t.classList.remove("selected")
        }
    }
    _onAuthenticateSuccess(s) {
        this.invalidate()
    }
    _onAuthenticateFailure(s) {
        this.invalidate()
    }
}
;
window.customElements.define("a-header", U);
var N = class extends m {
    constructor() {
        super()
    }
}
;
window.customElements.define("a-content", N);
var z = class extends m {
    constructor(e=null) {
        super();
        this._folder = e,
        this._folder && (this._name = document.createElement("span"),
        this._name.classList.add("name"),
        this._name.textContent = this._folder.name,
        this.appendChild(this._name),
        this._sampleImages = document.createElement("div"),
        this._sampleImages.classList.add("sample-images"),
        this.appendChild(this._sampleImages),
        this.dataset.folder = this._folder.id,
        this.initialize())
    }
    async initialize() {
        this._folder.id === "latest" ? (await n.getLatestImages(null, 4)).forEach(t=>{
            if (t) {
                let i = c.getImageUrl50pct(t.url);
                this._sampleImages.innerHTML += `<img src="${i}">`
            }
        }
        ) : this._folder.id === "sample" ? (await n.getSampleImages(4)).forEach(t=>{
            if (t) {
                let i = c.getImageUrl50pct(t.url);
                this._sampleImages.innerHTML += `<img src="${i}">`
            }
        }
        ) : await (this._folder.sampleImageIDs || []).forEach(async e=>{
            n.getImage(e, !0).then(t=>{
                if (t) {
                    let i = c.getImageUrl50pct(t.url);
                    this._sampleImages.innerHTML += `<img src="${i}">`
                }
            }
            )
        }
        )
    }
}
;
window.customElements.define("a-browse-folders-item", z);
var j = class extends m {
    constructor() {
        super();
        this._more = document.createElement("span"),
        this._more.classList.add("icon", "more"),
        this._more.textContent = "more_vert",
        this.appendChild(this._more),
        this._refresh = document.createElement("span"),
        this._refresh.classList.add("icon", "refresh"),
        this._refresh.dataset.refreshBrowse = "refresh",
        this._refresh.textContent = "refresh",
        this.appendChild(this._refresh),
        this._folders = document.createElement("div"),
        this._folders.classList.add("folders"),
        this.appendChild(this._folders),
        this._expanded = !1,
        this._onMoreClicked = this._onMoreClicked.bind(this),
        this._more.addEventListener("click", this._onMoreClicked)
    }
    async initialize() {
        await (await n.getSystemFolders()).forEach(async t=>{
            this._folders.appendChild(new z(t))
        }
        )
    }
    async setSelectedFolder(e) {
        for (let t = 0; t < this._folders.children.length; t++) {
            let i = this._folders.children[t];
            i.hasAttribute("data-folder") && i.getAttribute("data-folder") === e ? (i.classList.add("selected"),
            i.scrollIntoView({
                behavior: "smooth",
                inline: "nearest"
            })) : i.classList.remove("selected")
        }
    }
    _onMoreClicked() {
        this._expanded ? (this._expanded = !1,
        this.classList.remove("expanded")) : (this._expanded = !0,
        this.classList.add("expanded"))
    }
}
;
window.customElements.define("a-browse-folders", j);
var W = class extends m {
    constructor() {
        super();
        this._earliestTimestamp = null,
        this._gettingMore = !1,
        this._onLoad = this._onLoad.bind(this),
        this.addEventListener("load", this._onLoad, !0),
        this._onScroll = this._onScroll.bind(this),
        this.addEventListener("scroll", this._onScroll, !0);
        let e = {
            root: this,
            rootMargin: "0px",
            threshold: 0
        };
        this._onIntersectionObserved = this._onIntersectionObserved.bind(this),
        this._intersectionObserver = new IntersectionObserver(this._onIntersectionObserved,e)
    }
    async getFolderImages(e) {
        this._folderID = e,
        this._unobserveIntersections(),
        this._earliestTimestamp = 99999999999999,
        this.innerHTML = "",
        this.scrollTo(0, 0),
        await this._getMoreImages()
    }
    async _getMoreImages() {
        if (!this._gettingMore) {
            this._gettingMore = !0;
            let e = "";
            this._folderID === "latest" ? (await n.getLatestImages(this._earliestTimestamp)).forEach(a=>{
                let r = c.getImageUrl50pct(a.url);
                e += `<img class="loading ${Math.random() > .9 ? "big" : ""}" data-image="${a.id}" data-view-image="${a.id}" data-image-src="${r}" style="--rotation: ${-5 + Math.random() * 8}deg;">`,
                this._earliestTimestamp = a.completedDate
            }
            ) : this._folderID === "sample" ? (await n.getSampleImages()).forEach(a=>{
                let r = c.getImageUrl50pct(a.url);
                e += `<img class="loading ${Math.random() > .9 ? "big" : ""}" data-image="${a.id}" data-view-image="${a.id}" data-image-src="${r}" style="--rotation: ${-5 + Math.random() * 8}deg;">`,
                this._earliestTimestamp = a.completedDate
            }
            ) : (await n.getFolderItems(this._folderID, this._earliestTimestamp)).forEach(a=>{
                let r = c.getImageUrl50pct(a.url);
                e += `<img class="loading ${Math.random() > .9 ? "big" : ""}" data-image="${a.imageID}" data-view-image="${a.imageID}" data-image-src="${r}" style="--rotation: ${-5 + Math.random() * 8}deg;">`,
                this._earliestTimestamp = a.createdDate
            }
            ),
            this.lastElementChild ? this.lastElementChild.insertAdjacentHTML("afterend", e) : this.innerHTML += e,
            this._observeIntersections(),
            this._gettingMore = !1
        }
    }
    _observeIntersections() {
        for (let e of this.children)
            e.constructor === HTMLImageElement && e.classList.contains("loading") && this._intersectionObserver.observe(e)
    }
    _unobserveIntersections() {
        for (let e of this.children)
            e.constructor === HTMLImageElement && this._intersectionObserver.unobserve(e)
    }
    destroy() {
        this._unobserveIntersections(),
        this._intersectionObserver.disconnect()
    }
    _onScroll() {
        (this.scrollHeight - (this.scrollTop + this.offsetHeight)) / this.scrollHeight < .25 && this._getMoreImages()
    }
    _onLoad(e) {
        if (e.target.constructor === HTMLImageElement) {
            let t = e.target;
            t.classList.remove("loading"),
            this._intersectionObserver.unobserve(t)
        }
    }
    _onIntersectionObserved(e) {
        for (let t = 0; t < e.length; t++) {
            let i = e[t]
              , a = i.target;
            i.isIntersecting && a.constructor === HTMLImageElement && (a.src || (a.src = a.getAttribute("data-image-src")))
        }
    }
}
;
window.customElements.define("a-browse-images", W);
var V = class extends m {
    constructor() {
        super();
        this._isInitialized = !1,
        this._folders = new j,
        this.appendChild(this._folders),
        this._images = new W,
        this.appendChild(this._images)
    }
    async initialize() {
        this._isInitialized || (this._isInitialized = !0,
        await this._folders.initialize(),
        await this.setSelectedFolder("sample"))
    }
    async setSelectedFolder(e) {
        this._folderID !== e && (this._folderID = e,
        await this._folders.setSelectedFolder(this._folderID),
        await this._images.getFolderImages(this._folderID))
    }
    async refresh() {
        this._folderID && await this._images.getFolderImages(this._folderID)
    }
}
;
window.customElements.define("a-browse", V);
var y = class extends m {
    constructor() {
        super();
        this._label = document.createElement("span"),
        this.appendChild(this._label),
        this._textArea = document.createElement("textarea"),
        this._textArea.autocapitalize = "none",
        this._textArea.setAttribute("data-clarity-unmask", "true"),
        this.appendChild(this._textArea)
    }
    static get observedAttributes() {
        return ["label", "value"]
    }
    _onAttributeChanged(e, t, i) {
        e === "label" ? this.label = i : e === "value" ? this._textArea.value = i : e === "autofocus" && (this.autofocus = Boolean(i))
    }
    focus() {
        this._textArea.focus()
    }
    get inputMode() {
        return this._textArea.inputMode
    }
    set inputMode(e) {
        this._textArea.inputMode = e
    }
    get placeholder() {
        return this._textArea.placeholder
    }
    set placeholder(e) {
        this._textArea.placeholder = e
    }
    get value() {
        return this._textArea.value
    }
    set value(e) {
        this._textArea.value !== e && (this._textArea.value = e)
    }
    get label() {
        return this._label.innerText
    }
    set label(e) {
        this._label.innerText !== e && (this._label.innerText = e)
    }
    get readonly() {
        return this._textArea.readOnly
    }
    set readonly(e) {
        this._textArea.readOnly = e
    }
}
;
window.customElements.define("a-text-area", y);
var q = class extends m {
    constructor(e=null) {
        super();
        this._model = e,
        this._model && (this._name = document.createElement("span"),
        this._name.classList.add("name"),
        this._name.textContent = this._model.name,
        this.appendChild(this._name),
        this._sampleImages = document.createElement("div"),
        this._sampleImages.classList.add("sample-images"),
        this.appendChild(this._sampleImages),
        this.dataset.model = this._model.id,
        this.initialize())
    }
    async initialize() {}
}
;
window.customElements.define("a-generate-models-item", q);
var $ = class extends m {
    constructor() {
        super();
        this._modelData = [],
        this._more = document.createElement("span"),
        this._more.classList.add("icon", "more"),
        this._more.textContent = "more_vert",
        this.appendChild(this._more),
        this._models = document.createElement("div"),
        this._models.classList.add("models"),
        this.appendChild(this._models),
        this._expanded = !1,
        this._onMoreClicked = this._onMoreClicked.bind(this),
        this._more.addEventListener("click", this._onMoreClicked)
    }
    async initialize() {
        this._modelData = await n.getModels(),
        this._modelData.forEach((e,t)=>{
            t === 0 && (this._selectedModel = e),
            this._models.appendChild(new q(e))
        }
        )
    }
    async setSelectedModel(e) {
        if (this._selectedModel?.id !== e) {
            for (let t of this._modelData)
                if (t.id === e) {
                    this._selectedModel = t;
                    break
                }
            for (let t = 0; t < this._models.children.length; t++) {
                let i = this._models.children[t];
                i.hasAttribute("data-model") && i.getAttribute("data-model") === e ? (i.classList.add("selected"),
                i.scrollIntoView({
                    inline: "nearest"
                })) : i.classList.remove("selected")
            }
        }
    }
    _onMoreClicked() {
        this._expanded ? (this._expanded = !1,
        this.classList.remove("expanded")) : (this._expanded = !0,
        this.classList.add("expanded"))
    }
    get selectedModel() {
        return this._selectedModel
    }
}
;
window.customElements.define("a-generate-models", $);
var J = class extends m {
    constructor() {
        super();
        this.generateButtonText = "Generate 1 Image";
        this.generateMultiButtonText = "Generate 10 Images";
        this.isGenerating = !1;
        this.isGenerateMultiple = !1;
        this.generateMultipleRemaining = 0;
        this.internal_Generate = this.internal_Generate.bind(this),
        this._isInitialized = !1,
        this._isGenerating = !1,
        this._imageID = null,
        this._models = new $,
        this.appendChild(this._models),
        this._resultText = document.createElement("span"),
        this._resultText.style.textAlign = "center",
        this._resultText.style.fontSize = "0.8em",
        this._resultText.innerText = "",
        this.appendChild(this._resultText);
        let e = document.createElement("div");
        e.classList.add("prompt"),
        this.appendChild(e),
        this._prompt = new y,
        this._prompt.placeholder = "beautiful, green eyes, long hair",
        e.appendChild(this._prompt),
        this._promptInfo = document.createElement("span"),
        this._promptInfo.classList.add("icon"),
        this._promptInfo.textContent = "help_outline",
        this._promptInfo.dataset.promptInfo = "true",
        e.appendChild(this._promptInfo);
        let t = document.createElement("span");
        t.style.alignSelf = "center",
        this._generate = document.createElement("button"),
        this._generate.style.width = "150px",
        this._generate.style.height = "30px",
        this._generate.style.fontWeight = "bold",
        this._generate.textContent = this.generateButtonText,
        t.appendChild(this._generate),
        t.appendChild(document.createTextNode("\xA0\xA0")),
        this._generateMultiple = document.createElement("button"),
        this._generateMultiple.style.width = "150px",
        this._generateMultiple.style.height = "30px",
        this._generateMultiple.style.fontWeight = "bold",
        this._generateMultiple.textContent = this.generateMultiButtonText,
        t.appendChild(this._generateMultiple),
        this.appendChild(t),
        this._results = document.createElement("div"),
        this._results.classList.add("first-land"),
        this.appendChild(this._results),
        this._image = document.createElement("img"),
        this._results.appendChild(this._image),
        this._report = document.createElement("span"),
        this._report.classList.add("icon", "report"),
        this._report.textContent = "outlined_flag",
        this._results.appendChild(this._report),
        this._save = document.createElement("span"),
        this._save.classList.add("icon", "save"),
        this._save.textContent = "folder_special",
        this._results.appendChild(this._save),
        this._share = document.createElement("span"),
        this._share.classList.add("icon", "share"),
        this._share.textContent = "send",
        this._results.appendChild(this._share),
        this._onGenerate = this._onGenerate.bind(this),
        this._generate.addEventListener("click", this._onGenerate),
        this._onGenerateMultiple = this._onGenerateMultiple.bind(this),
        this._generateMultiple.addEventListener("click", this._onGenerateMultiple),
        this._onLoaded = this._onLoaded.bind(this),
        this._image.addEventListener("load", this._onLoaded)
    }
    async initialize() {
        this._isInitialized || (this._isInitialized = !0,
        await this._models.initialize())
    }
    async setSelectedModel(e) {
        await this._models.setSelectedModel(e)
    }
    generationStarted() {
        this.isGenerating = !0,
        this._generate.disabled = !0,
        this._generateMultiple.disabled = !0,
        this._generate.textContent = "Please wait...",
        this.generateMultipleRemaining > 0 ? this._generateMultiple.textContent = "Loading... " + this.generateMultipleRemaining : this._generateMultiple.textContent = "Loading... "
    }
    generationEnded() {
        this.isGenerating = !1,
        this._generate.disabled = !1,
        this._generateMultiple.disabled = !1,
        this._generate.textContent = this.generateButtonText,
        this._generateMultiple.textContent = this.generateMultiButtonText
    }
    async _onGenerate() {
        this.isGenerating || (this.generationStarted(),
        this.internal_Generate())
    }
    async _onGenerateMultiple() {
        this.isGenerating || (this.generationStarted(),
        this.isGenerateMultiple = !0,
        this.generateMultipleRemaining = 10,
        this.internal_Generate())
    }
    async internal_Generate() {
        if (this.isGenerateMultiple && this.generateMultipleRemaining == 0) {
            this.isGenerateMultiple = !1,
            this.generationEnded();
            return
        }
        this.generateMultipleRemaining > 0 ? this._generateMultiple.textContent = "Loading... " + this.generateMultipleRemaining : this._generateMultiple.textContent = "Loading... ",
        this.generateMultipleRemaining = this.generateMultipleRemaining - 1,
        this._report.removeAttribute("data-report-image");
        let e = await n.generateImage(this._prompt.value);
        e.hasError ? e.errorMessage && (o.info(e.errorMessage),
        this.generationEnded()) : (this._isGenerating = !0,
        this._imageID = e.payload.imageID,
        e.payload.ignoredWords.length > 0 ? this._resultText.innerHTML = "Ignored words: " + e.payload.ignoredWords + "<br/>Ignored words are added upon daily review." : this._resultText.innerHTML = "",
        this._image.style.setProperty("--rotation", `${-20 + Math.random() * 40}deg`),
        this._results.classList.remove("first-land"),
        this._checkStatus())
    }
    _onLoaded() {
        this._results.classList.remove("loading")
    }
    async _checkStatus() {
        let e = await n.getImageStatus(this._imageID);
        e.hasError || (e.payload.status === "generating" ? setTimeout(()=>{
            this._checkStatus()
        }
        , 100) : e.payload.status === "failed" ? (this._isGenerating = !1,
        this._imageID = null,
        this.generationEnded()) : e.payload.status === "complete" && (this._image.src = e.payload.url,
        this._report.dataset.reportImage = this._imageID,
        this.isGenerateMultiple ? this.internal_Generate() : this.generationEnded()))
    }
    get prompt() {
        return this._prompt.value
    }
    set prompt(e) {
        this._prompt.value = e
    }
    get imageID() {
        return this._imageID
    }
}
;
window.customElements.define("a-generate", J);
var Y = class extends m {
    constructor() {
        super();
        this._selectedFolderID = null,
        this._more = document.createElement("span"),
        this._more.classList.add("icon", "more"),
        this._more.textContent = "more_vert",
        this.appendChild(this._more),
        this._createFolder = document.createElement("span"),
        this._createFolder.dataset.createFolder = "true",
        this._createFolder.classList.add("icon", "create-folder"),
        this._createFolder.textContent = "create_new_folder",
        this.appendChild(this._createFolder),
        this._refresh = document.createElement("span"),
        this._refresh.classList.add("icon", "refresh"),
        this._refresh.dataset.refreshCurate = "refresh",
        this._refresh.textContent = "refresh",
        this.appendChild(this._refresh),
        this._folders = document.createElement("div"),
        this._folders.classList.add("folders"),
        this.appendChild(this._folders),
        this._expanded = !1,
        this._onMoreClicked = this._onMoreClicked.bind(this),
        this._more.addEventListener("click", this._onMoreClicked)
    }
    async initialize() {
        await this._buildFolders()
    }
    async setSelectedFolder(e) {
        this._selectedFolderID = e;
        for (let t = 0; t < this._folders.children.length; t++) {
            let i = this._folders.children[t];
            i.hasAttribute("data-folder") && i.getAttribute("data-folder") === e ? (i.classList.add("selected"),
            i.scrollIntoView({
                inline: "nearest"
            })) : i.classList.remove("selected")
        }
    }
    async _buildFolders() {
        this._folders.innerHTML = "";
        let e = n.selfFolders
          , t = null;
        e.forEach(async i=>{
            let a = new x(i);
            this._selectedFolderID === i.id && (t = i.id,
            a.classList.add("selected"));
            let r = new x(i);
            r.dataset.folder = i.id,
            this._folders.appendChild(r)
        }
        ),
        e.length ? t !== null ? this.setSelectedFolder(t) : this.setSelectedFolder(e[0].id) : this._selectedFolderID = null
    }
    _onMoreClicked() {
        this._expanded ? (this._expanded = !1,
        this.classList.remove("expanded")) : (this._expanded = !0,
        this.classList.add("expanded"))
    }
    get selectedFolderID() {
        return this._selectedFolderID
    }
}
;
window.customElements.define("a-curate-folders", Y);
var Q = class extends m {
    constructor() {
        super();
        this._onLoad = this._onLoad.bind(this),
        this.addEventListener("load", this._onLoad, !0);
        let e = {
            root: this,
            rootMargin: "0px",
            threshold: 0
        };
        this._onIntersectionObserved = this._onIntersectionObserved.bind(this),
        this._intersectionObserver = new IntersectionObserver(this._onIntersectionObserved,e)
    }
    async getFolderImages(e, t=!1) {
        if (!t && this._folderID === e)
            return;
        this._folderID = e,
        this._unobserveIntersections(),
        this.innerHTML = "",
        this.scrollTo(0, 0);
        let i = [];
        if (this._folderID === null)
            return;
        i = await n.getFolderItems(e);
        let a = "";
        i.forEach(r=>{
            let l = c.getImageUrl50pct(r.url);
            a += `<img class="loading ${Math.random() > .85 ? "big" : ""}" data-image="${r.imageID}" data-view-image="${r.imageID}" data-image-src="${l}" style="--rotation: ${-5 + Math.random() * 10}deg;">`
        }
        ),
        this.innerHTML = a,
        this._observeIntersections()
    }
    _observeIntersections() {
        for (let e of this.children)
            e.constructor === HTMLImageElement && this._intersectionObserver.observe(e)
    }
    _unobserveIntersections() {
        for (let e of this.children)
            e.constructor === HTMLImageElement && this._intersectionObserver.unobserve(e)
    }
    destroy() {
        this._unobserveIntersections(),
        this._intersectionObserver.disconnect()
    }
    _onLoad(e) {
        e.target.constructor === HTMLImageElement && e.target.classList.remove("loading")
    }
    _onIntersectionObserved(e) {
        for (let t = 0; t < e.length; t++) {
            let i = e[t]
              , a = i.target;
            i.isIntersecting && a.constructor === HTMLImageElement && (a.src || (a.src = a.getAttribute("data-image-src")))
        }
    }
}
;
window.customElements.define("a-curate-images", Q);
var X = class extends m {
    constructor() {
        super();
        this._isInitialized = !1,
        this._folders = new Y,
        this.appendChild(this._folders),
        this._images = new Q,
        this.appendChild(this._images),
        this._onFolderCreated = this._onFolderCreated.bind(this),
        n.application.addEventListener("folderCreated", this._onFolderCreated)
    }
    async initialize() {
        this._isInitialized || (this._isInitialized = !0,
        await this._folders.initialize(),
        await this._images.getFolderImages(this._folders.selectedFolderID))
    }
    async setSelectedFolder(e) {
        await this._folders.setSelectedFolder(e),
        await this._images.getFolderImages(this._folders.selectedFolderID)
    }
    async _onFolderCreated() {
        await this._folders.initialize(),
        await this._images.getFolderImages(this._folders.selectedFolderID)
    }
    async refresh() {
        await this._images.getFolderImages(this._folders.selectedFolderID, !0)
    }
}
;
window.customElements.define("a-curate", X);
var K = class extends m {
    constructor() {
        super();
        this.generate2ButtonText = "Generate 1 Image";
        this.generate2MultiButtonText = "Generate Steps";
        this.pendingImages = new Set;
        this.isAnimating = !1;
        this.animateImageCurrentStep = 0;
        this.animate_loopForever = !0;
        this.isGenerating = !1;
        this.generate2MultipleRemaining = 0;
        this.generate2MultiCount = 1;
        this.imgArray = new Array;
        this.doStepsIteration = !0;
        this.internal_Generate2 = this.internal_Generate2.bind(this),
        this._isInitialized = !1,
        this._isGenerating = !1,
        this._resultText = document.createElement("span"),
        this._resultText.style.textAlign = "center",
        this._resultText.style.fontSize = "0.8em",
        this._resultText.innerText = "",
        this.appendChild(this._resultText);
        let e = document.createElement("div");
        e.classList.add("prompt"),
        this.appendChild(e),
        this._prompt = new y,
        this._prompt.placeholder = "beautiful woman, pretty face, long hair, sexy look, beautiful scenery",
        e.appendChild(this._prompt);
        let t = document.createElement("span");
        t.style.alignSelf = "center",
        this._generate2 = document.createElement("button"),
        this._generate2.style.width = "150px",
        this._generate2.style.height = "30px",
        this._generate2.style.fontWeight = "bold",
        this._generate2.textContent = this.generate2ButtonText,
        t.appendChild(this._generate2),
        t.appendChild(document.createTextNode("\xA0\xA0")),
        this._generate2Multiple = document.createElement("button"),
        this._generate2Multiple.style.width = "150px",
        this._generate2Multiple.style.height = "30px",
        this._generate2Multiple.style.fontWeight = "bold",
        this._generate2Multiple.textContent = this.generate2MultiButtonText,
        t.appendChild(this._generate2Multiple),
        t.appendChild(document.createTextNode("\xA0\xA0")),
        this._btnAnimate = document.createElement("button"),
        this._btnAnimate.style.width = "150px",
        this._btnAnimate.style.height = "30px",
        this._btnAnimate.style.fontWeight = "bold",
        this._btnAnimate.style.display = "none",
        this._btnAnimate.textContent = "Start Animation",
        t.appendChild(this._btnAnimate),
        this.appendChild(t),
        this._results = document.createElement("div"),
        this.appendChild(this._results),
        this._onGenerate2 = this._onGenerate2.bind(this),
        this._generate2.addEventListener("click", this._onGenerate2),
        this._onGenerate2Multiple = this._onGenerate2Multiple.bind(this),
        this._generate2Multiple.addEventListener("click", this._onGenerate2Multiple),
        this._onLoaded = this._onLoaded.bind(this),
        this.animateImage_Start = this.animateImage_Start.bind(this),
        this.animateImage_Step = this.animateImage_Step.bind(this),
        this.btnAnimate_Click = this.btnAnimate_Click.bind(this),
        this._btnAnimate.addEventListener("click", this.btnAnimate_Click),
        setInterval(this.animateImage_Step, 100)
    }
    async initialize() {
        this._isInitialized || (this._isInitialized = !0)
    }
    async setSelectedModel(e) {}
    btnAnimate_Click() {
        this.isAnimating ? (this.isAnimating = !1,
        this._btnAnimate.textContent = "Start Animation") : (this.isAnimating = !0,
        this._btnAnimate.textContent = "Stop Animation")
    }
    animateImage_Start() {
        if (this.imgArray != null) {
            for (var e = 0; e < this.imgArray.length; e++)
                this.imgArray[e].style.display = "none";
            this.animateImageCurrentStep = 0
        }
        this.isAnimating = !0
    }
    animateImage_Step() {
        if (this.isAnimating && !(this.imgArray == null || this.imgArray.length == 0)) {
            if (this.imgArray.length <= this.animateImageCurrentStep + 1) {
                if (!this.animate_loopForever)
                    return;
                this.animateImageCurrentStep > 0 && (this.imgArray[this.animateImageCurrentStep - 1].style.display = "none"),
                this.animateImageCurrentStep = 0
            }
            this.imgArray[this.animateImageCurrentStep].style.display = "initial",
            this.animateImageCurrentStep > 0 && (this.imgArray[this.animateImageCurrentStep - 1].style.display = "none"),
            this.animateImageCurrentStep++
        }
    }
    generationStarted() {
        for (this._btnAnimate.style.display = "none"; this._results.firstChild; )
            this._results.removeChild(this._results.firstChild);
        this.isAnimating = !1,
        this.pendingImages.clear(),
        this.imgArray = new Array,
        this.isGenerating = !0,
        this._generate2.disabled = !0,
        this._generate2Multiple.disabled = !0,
        this.updateProgressText()
    }
    updateProgressText() {
        this._generate2.textContent = "Please wait...",
        this.generate2MultipleRemaining > 0 ? this._generate2Multiple.textContent = "Loading... " + this.generate2MultipleRemaining : this._generate2Multiple.textContent = "Loading... "
    }
    generationEnded() {
        this.isGenerating = !1,
        this._generate2.disabled = !1,
        this._generate2Multiple.disabled = !1,
        this._generate2.textContent = this.generate2ButtonText,
        this._generate2Multiple.textContent = this.generate2MultiButtonText,
        this.generate2MultipleRemaining = 0,
        this.doStepsIteration && (this._btnAnimate.style.display = "initial",
        this._btnAnimate.textContent = "Stop Animation",
        this.animateImage_Start())
    }
    async _onGenerate2() {
        this.isGenerating || (this.generate2MultiCount = 1,
        this.generate2MultipleRemaining = this.generate2MultiCount,
        this.generationStarted(),
        this.internal_Generate2())
    }
    async _onGenerate2Multiple() {
        this.isGenerating || (this.generate2MultiCount = 25,
        this.generate2MultipleRemaining = this.generate2MultiCount,
        this.generationStarted(),
        this.internal_Generate2())
    }
    async internal_Generate2() {
        let e = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        this.doStepsIteration && (this.imgArray = new Array);
        for (let t = 0; t < this.generate2MultiCount; t++) {
            let i = -1
              , a = 20;
            this.doStepsIteration && (i = e,
            a = t + 10);
            let r = await n.generateImage(this._prompt.value, "", i, a);
            if (r.hasError)
                r.errorMessage && (this._resultText.innerHTML = r.errorMessage,
                this.pendingImages.size == 0 && this.generationEnded());
            else {
                let l = document.createElement("img");
                l.id = "img_" + r.payload.imageID,
                this._results.prepend(l),
                this.doStepsIteration && this.imgArray.push(l),
                this.pendingImages.add(r.payload.imageID),
                r.payload.ignoredWords.length > 0 ? this._resultText.innerHTML = "Ignored words: " + r.payload.ignoredWords + "<br/>Ignored words are added upon daily review." : this._resultText.innerHTML = ""
            }
        }
        this._checkStatus()
    }
    _onLoaded() {
        this._results.classList.remove("loading")
    }
    async _checkStatus() {
        for (let e of Array.from(this.pendingImages)) {
            let t = await n.getImageStatus(e);
            if (!t.hasError && t.payload.status !== "generating") {
                if (t.payload.status === "failed")
                    this.pendingImages.delete(e),
                    this.generate2MultipleRemaining = this.pendingImages.size,
                    this.updateProgressText();
                else if (t.payload.status === "complete") {
                    let i = document.getElementById("img_" + e);
                    i.src = t.payload.url,
                    this.pendingImages.delete(e),
                    this.generate2MultipleRemaining = this.pendingImages.size,
                    this.updateProgressText()
                }
            }
        }
        this.pendingImages.size == 0 ? (this._isGenerating = !1,
        this.generationEnded()) : setTimeout(()=>{
            this._checkStatus()
        }
        , 100)
    }
    get prompt() {
        return this._prompt.value
    }
    set prompt(e) {
        this._prompt.value = e
    }
}
;
window.customElements.define("a-generate2", K);
var Z = class extends m {
    constructor() {
        super();
        this.doGenerateAnimation = !1;
        this.generate3ButtonText = "Generate 2 Images";
        this.generate3MultiButtonText = "Generate N Images";
        this.pendingImages = new Set;
        this.samplePromptTexts = ["sexy woman, colorful tattoos, colorful hat, sunshine bright day, golden wet skin shining, sexy look", "a sexy beautiful lingerie model with green eyes, golden wet skin shining, orange sunset light, laying down, coy smile, tanned skin, see through black lace lingerie, black wavy shiny hair, 50mm portrait, sun , glamour, soft curves, ass, full wet lips", "stunningly beautiful woman, colorful hat, sunshine, nsfw", "beautiful woman, amazing stunningly beautiful, most beautiful women ever", "beautiful woman on the beach, ocean scenery, bright day, highly detailed hdr photo", "beautiful woman hiking, nsfw, big boobs, gorgeous mountain scenery, bright day, stunningly beautiful", "beautiful woman on white bed, nsfw, big boobs, cum, gorgeous face, bright big eyes"];
        this.savedPrompts = new Set;
        this.isAnimating = !1;
        this.animateImageCurrentStep = 0;
        this.animate_loopForever = !0;
        this.resultBoxIsEmpty = !1;
        this.isGenerating = !1;
        this.generate3MultipleRemaining = 0;
        this.generate3MultiCount = 1;
        this.imgArray = new Array;
        this.variationsOnSeed = !1;
        this.variationSourceSeed = 123;
        this.variationAmount = .09;
        this.timeoutTimerHandle = -1;
        this.possiblePleaseWaitTexts = ["It's like having a really talented artist in your computer, but without the attitude or the need to feed them.", "Imagine a magical generator that spits out beautiful images with a few clicks - wouldn't that be amazing!", "This AI-powered image generator is like a box of chocolates, you never know what you're going to get, but it's always delicious.", "It's like having a genie in a lamp that grants you unlimited wishes, but all you ask for are beautiful images.", "SexyAI Image Generation is like a game of Pictionary with an AI opponent, except the opponent always wins and the drawings are always amazing.", "With SexyAI image generation, you don't need to be an artist to create masterpieces - just let the machine do the work.", "It's like having a photorealistic dream machine at your fingertips, except you don't need to go to sleep to use it.", "Think of it as a high-tech art assistant that always knows what you want and delivers beyond your expectations.", "This AI-powered image generator is like a magician's hat - you never know what will come out, but it's always impressive.", "SexyAI Image Generation is like having a virtual art studio that never runs out of inspiration or creativity.", "It's like having a superpower to create stunning images with ease, but without the responsibility of saving the world.", "This AI-powered image generator is like a crystal ball that shows you beautiful and unique visions of the world.", "Think of it as a modern-day version of Bob Ross, but instead of teaching you how to paint, it paints for you.", "It's like having a talented ghost artist working on your behalf, but without the haunting or paranormal activities.", "SexyAI Image Generation is like a virtual art gallery that curates and displays your favorite works of art, but they're all created by an AI.", "It's like having a window to a world of endless beauty, where every image generated is a breathtaking masterpiece.", "Think of it as a digital oasis of stunning visuals, where you can escape from reality and immerse yourself in beauty.", "It's like having a personal art curator that always knows your taste and preferences and delivers beautiful images every time.", "This AI-powered image generator is like a fountain of creativity that never runs dry, always providing new and beautiful images.", "It's like having a magical painting brush that creates beautiful images with every stroke, without requiring any artistic skills.", "SexyAI Image Generation is an advanced tool that uses machine learning algorithms to create high-quality, diverse, and realistic images.", "It's like having a personal art genie that pops out of your computer and grants you unlimited wishes for beautiful images.", "SexyAI Image Generation is like a wizard's cauldron that brews up a concoction of stunning visuals every time you click 'Generate'.", "This AI-powered image generator is like a unicorn that poops out rainbows, except the rainbows are beautiful images and the unicorn is a computer program.", "It's like having a high-tech crystal ball that shows you a world of beautiful and unique images, without the need for psychic abilities."];
        this.queueStatus = new Map;
        this.doDemo = this.doDemo.bind(this),
        this.generate3MultiCount = 100,
        this.generate3MultiButtonText = "Generate " + this.generate3MultiCount + " Images",
        this.loadLocalStorage(),
        this.internal_Generate3 = this.internal_Generate3.bind(this),
        this._isInitialized = !1,
        this._isGenerating = !1,
        this._resultText = document.createElement("span"),
        this._resultText.style.textAlign = "center",
        this._resultText.style.fontSize = "0.8em",
        this._resultText.innerText = "",
        this.appendChild(this._resultText),
        this._selectPromptHistory = document.createElement("select"),
        this._selectPromptHistory.style.display = "none",
        this._selectPromptHistory.style.backgroundColor = "black",
        this._selectPromptHistory.style.color = "white",
        this._selectPromptHistory.style.marginLeft = "30px",
        this._selectPromptHistory.style.marginRight = "30px",
        this._selectPromptHistory.addEventListener("change", ()=>{
            let i = this._selectPromptHistory.options[this._selectPromptHistory.selectedIndex].value;
            if (i && i.length > 0)
                if (i == "CLEAR")
                    o.confirm("Delete Prompt History?").then(a=>{
                        this._selectPromptHistory.selectedIndex = 0,
                        this._selectPromptHistory.blur(),
                        a == !0 && (this.savedPrompts.clear(),
                        this.localStorageObj.PromptHistory = new Array,
                        this.localStorageObj.LastPrompt = new se,
                        this.saveLocalStorage(),
                        this.loadPromptHistoryGUI())
                    }
                    );
                else {
                    let a = JSON.parse(i);
                    this._promptBox.value = a.Prompt
                }
            else
                this._promptBox.value = "";
            n.trackEvent("promptHistoryChanged", {
                userID: n?.self?.userID
            })
        }
        ),
        this.appendChild(this._selectPromptHistory),
        this._selectModel = document.createElement("select"),
        this._selectModel.style.backgroundColor = "black",
        this._selectModel.style.color = "white",
        this._selectModel.style.marginLeft = "30px",
        this._selectModel.style.marginRight = "30px",
        this.appendChild(this._selectModel);
        {
            let i = document.createElement("option");
            i.value = "sdxl_base_r2",
            i.text = "SDXL (SFW)",
            this._selectModel.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "model2",
            i.text = "Realistic / Porn  [PornMerge]",
            this._selectModel.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "model3",
            i.text = "Realistic /  Artistic   [Deliberate]",
            this._selectModel.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "model1",
            i.text = "Realistic   [Empower]",
            this._selectModel.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "model4",
            i.text = "Hentai / Anime  [BOM]",
            this._selectModel.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "model6",
            i.text = "Homoerotic V2 (Realistic Men)",
            this._selectModel.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "furry",
            i.text = "Furry",
            this._selectModel.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "model7",
            i.text = "Reliberate",
            this._selectModel.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "model8",
            i.text = "Realistic Vision",
            this._selectModel.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "model9",
            i.text = "DreamShaper",
            this._selectModel.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "model10",
            i.text = "Babes",
            this._selectModel.appendChild(i)
        }
        this._selectModel.setAttribute("data-clarity-unmask", "true"),
        this._selectModel.value = "model7";
        let e = document.createElement("div");
        e.classList.add("prompt"),
        this.appendChild(e),
        this._promptBox = new y,
        this._promptBox.value = this.getSamplePromptText(),
        this._promptBox.setAttribute("data-clarity-unmask", "true"),
        e.appendChild(this._promptBox),
        e.appendChild(document.createElement("br")),
        this._promptBoxNeg = new y,
        this._promptBoxNeg.placeholder = "Negative prompt (Use this to add keywords you do not want in your image)",
        e.appendChild(this._promptBoxNeg);
        let t = document.createElement("span");
        t.style.alignSelf = "center",
        this._generate3 = document.createElement("button"),
        this._generate3.style.width = "150px",
        this._generate3.style.height = "30px",
        this._generate3.style.fontWeight = "bold",
        this._generate3.textContent = this.generate3ButtonText,
        t.appendChild(this._generate3),
        t.appendChild(document.createTextNode("\xA0\xA0\xA0")),
        this._generate3Multiple = document.createElement("button"),
        this._generate3Multiple.style.width = "150px",
        this._generate3Multiple.style.height = "30px",
        this._generate3Multiple.style.fontWeight = "bold",
        this._generate3Multiple.textContent = this.generate3MultiButtonText,
        t.appendChild(this._generate3Multiple),
        t.appendChild(document.createElement("br")),
        t.appendChild(document.createElement("br")),
        this.btnClear = document.createElement("button"),
        this.btnClear.style.width = "150px",
        this.btnClear.style.height = "30px",
        this.btnClear.style.fontWeight = "bold",
        this.btnClear.textContent = "Clear Prompt",
        this.btnClear.addEventListener("click", async()=>{
            await o.confirm("Clear Prompt Box?") && (this._promptBox.value = "")
        }
        ),
        t.appendChild(this.btnClear),
        t.appendChild(document.createTextNode("\xA0\xA0\xA0")),
        this.btnFeelingLucky = document.createElement("button"),
        this.btnFeelingLucky.style.width = "150px",
        this.btnFeelingLucky.style.height = "30px",
        this.btnFeelingLucky.style.fontWeight = "bold",
        this.btnFeelingLucky.textContent = "I'm Feeling Lucky",
        this.btnFeelingLucky.addEventListener("click", ()=>{
            this._promptBox.value = this.getSamplePromptText(),
            this._onGenerate3()
        }
        ),
        t.appendChild(this.btnFeelingLucky),
        t.appendChild(document.createTextNode("\xA0\xA0")),
        this._btnAnimate = document.createElement("button"),
        this._btnAnimate.style.width = "150px",
        this._btnAnimate.style.height = "30px",
        this._btnAnimate.style.fontWeight = "bold",
        this._btnAnimate.style.display = "none",
        this._btnAnimate.textContent = "Start Animation",
        t.appendChild(this._btnAnimate),
        this.appendChild(t),
        this.bottomStatusLabel = document.createElement("span"),
        this.appendChild(this.bottomStatusLabel),
        this._results = document.createElement("div"),
        this._results.style.width = "100%",
        this._results.style.display = "flex",
        this._results.style.flexFlow = "row wrap",
        this.appendChild(this._results),
        this._onGenerate3 = this._onGenerate3.bind(this),
        this._generate3.addEventListener("click", this._onGenerate3),
        this._onGenerate3Multiple = this._onGenerate3Multiple.bind(this),
        this._generate3Multiple.addEventListener("click", this._onGenerate3Multiple),
        this._onLoaded = this._onLoaded.bind(this),
        this.animateImage_Start = this.animateImage_Start.bind(this),
        this.animateImage_Step = this.animateImage_Step.bind(this),
        this.btnAnimate_Click = this.btnAnimate_Click.bind(this),
        this._btnAnimate.addEventListener("click", this.btnAnimate_Click),
        this.loadPromptHistoryGUI(!1),
        setInterval(this.animateImage_Step, 100)
    }
    getSamplePromptText() {
        let e = Math.floor(Math.random() * this.samplePromptTexts.length);
        return this.samplePromptTexts[e]
    }
    doDemo() {
        this._promptBox.value = "attractive woman, big boobs, (cyberpunk style), pretty face, smiling, colorful hair, nsfw",
        this._onGenerate3()
    }
    loadLocalStorage() {
        this.localStorageObj = {},
        this.localStorageObj.PromptHistory = new Array,
        this.localStorageObj.LastPrompt = null;
        return;
        try {
            let e = localStorage.getItem("Generate3_LS");
            if (e != null) {
                this.localStorageObj = JSON.parse(e);
                for (let t of this.localStorageObj.PromptHistory)
                    this.savedPrompts.add(t.Prompt)
            } else
                this.localStorageObj = {},
                this.localStorageObj.PromptHistory = new Array,
                this.localStorageObj.LastPrompt = null
        } catch {
            this.localStorageObj = {},
            this.localStorageObj.PromptHistory = new Array,
            this.localStorageObj.LastPrompt = null
        }
    }
    saveLocalStorage() {}
    loadPromptHistoryGUI(e=!0) {
        if (this.localStorageObj != null)
            try {
                for (; this._selectPromptHistory.options.length > 0; )
                    this._selectPromptHistory.options.remove(this._selectPromptHistory.options.length - 1);
                {
                    let i = document.createElement("option");
                    i.value = "",
                    i.text = "",
                    this._selectPromptHistory.appendChild(i)
                }
                {
                    let i = document.createElement("option");
                    i.value = "CLEAR",
                    i.text = "Clear Prompt History...",
                    this._selectPromptHistory.appendChild(i)
                }
                let t = new Set;
                for (let i of this.localStorageObj.PromptHistory)
                    if (t.has(i.Prompt) == !1) {
                        t.add(i.Prompt);
                        let a = document.createElement("option");
                        a.value = JSON.stringify(i),
                        a.text = i.Prompt,
                        t.size == 1 && (a.selected = !0,
                        e == !1 && (this._promptBox.value = i.Prompt)),
                        this._selectPromptHistory.appendChild(a)
                    }
            } catch (t) {
                console.log("error with local storage: ", t)
            }
    }
    async initialize() {
        this._isInitialized || (this._isInitialized = !0)
    }
    authChanged() {}
    async setSelectedModel(e) {}
    btnAnimate_Click() {
        this.isAnimating ? (this.isAnimating = !1,
        this._btnAnimate.textContent = "Start Animation") : (this.isAnimating = !0,
        this._btnAnimate.textContent = "Stop Animation")
    }
    animateImage_Start() {
        if (this.imgArray != null) {
            for (var e = 0; e < this.imgArray.length; e++)
                this.imgArray[e].style.display = "none";
            this.animateImageCurrentStep = 0
        }
        this.isAnimating = !0
    }
    animateImage_Step() {
        if (this.isAnimating && !(this.imgArray == null || this.imgArray.length == 0)) {
            if (this.imgArray.length <= this.animateImageCurrentStep + 1) {
                if (!this.animate_loopForever)
                    return;
                this.animateImageCurrentStep > 0 && (this.imgArray[this.animateImageCurrentStep - 1].style.display = "none"),
                this.animateImageCurrentStep = 0
            }
            this.imgArray[this.animateImageCurrentStep].style.display = "initial",
            this.animateImageCurrentStep > 0 && (this.imgArray[this.animateImageCurrentStep - 1].style.display = "none"),
            this.animateImageCurrentStep++
        }
    }
    generationStarted() {
        for (this._btnAnimate.style.display = "none"; this._results.firstChild; )
            this._results.removeChild(this._results.firstChild);
        this.resultBoxIsEmpty = !0,
        this.bottomStatusLabel.innerHTML = "Please wait Generating.<br/>This process requires a lot of GPU processing time. Please wait...",
        this.isAnimating = !1,
        this.pendingImages.clear(),
        this.imgArray = new Array,
        this.isGenerating = !0,
        this._generate3.disabled = !0,
        this.btnFeelingLucky.disabled = !0,
        this._generate3Multiple.disabled = !0,
        this.updateProgressText()
    }
    async updateETALabel() {
        try {
            let e = ""
              , t = 0;
            this.queueStatus.forEach((i,a)=>{
                t++,
                e += "<br/>Image " + t + " queue position: <b>" + i + "</b>"
            }
            ),
            n.getTier() == 0 ? this.bottomStatusLabel.innerHTML = "The AI is Generating your image...<br/><br/><u><a href='https://patreon.com/sexyai'>Upgrade to Pro for more features and faster generation.</a></u><br/><br/>Countdown to image generation:<br/>" + e : this.bottomStatusLabel.innerHTML = "The AI is Generating your image...<br/><br/>Countdown to image generation:<br/>" + e
        } catch {}
    }
    updateProgressText() {
        this._generate3.textContent = "Please wait...",
        this.generate3MultipleRemaining > 0 ? this._generate3Multiple.textContent = "Loading... " + this.generate3MultipleRemaining : this._generate3Multiple.textContent = "Loading... "
    }
    generationEnded() {
        clearTimeout(this.timeoutTimerHandle),
        this.isGenerating = !1,
        this._generate3.disabled = !1,
        this._generate3Multiple.disabled = !1,
        this.btnFeelingLucky.disabled = !1,
        this._generate3.textContent = this.generate3ButtonText,
        this._generate3Multiple.textContent = this.generate3MultiButtonText,
        this.generate3MultipleRemaining = 0,
        this.bottomStatusLabel.innerHTML = "",
        this.doGenerateAnimation && (this._btnAnimate.style.display = "initial",
        this._btnAnimate.textContent = "Stop Animation",
        this.animateImage_Start())
    }
    async _onGenerate3() {
        if ((this.localStorageObj.Count_Single || 0) >= 10 && n?.self?.isAuthenticated == !1) {
            this._resultText.innerHTML = "Sign in to generate more images.",
            await o.info("Sign in to generate more images."),
            await o.viewAccount();
            return
        }
        this.isGenerating || (this.generate3MultipleRemaining = 2,
        this.generationStarted(),
        this.internal_Generate3())
    }
    async _onGenerate3Multiple() {
        if (await o.checkForPro() != !1) {
            if ((this.localStorageObj.Count_Multi || 0) >= 3 && n?.self?.isAuthenticated == !1) {
                this._resultText.innerHTML = "Sign in to generate more images.",
                await o.info("Sign in to generate more images."),
                await o.viewAccount();
                return
            }
            this.isGenerating || (this.generate3MultipleRemaining = this.generate3MultiCount,
            this.generationStarted(),
            this.internal_Generate3())
        }
    }
    async GenerateVariations(e, t) {
        let i = n.getTier();
        if (await o.checkForPro() != !1) {
            if ((this.localStorageObj.Count_Multi || 0) >= 3 && n?.self?.isAuthenticated == !1) {
                this._resultText.innerHTML = "Sign in to generate more images.",
                await o.info("Sign in to generate more images."),
                await o.viewAccount();
                return
            }
            this.generationEnded(),
            this.variationsOnSeed = !0,
            this._promptBox.value = e.prompt,
            this._promptBoxNeg.value = e?.negprompt || "",
            this._promptBoxNeg.value = this._promptBoxNeg.value.replace("child,childish,underage,baby,kids,", ""),
            this._selectModel.value = e.modelName,
            this.variationSourceSeed = e.seed,
            this.variationAmount = t,
            this.generate3MultipleRemaining = i == 0 ? 1 : this.generate3MultiCount,
            this.generationStarted(),
            this.internal_Generate3(),
            n.trackEvent("GenerateVariations", {
                userID: n?.self?.userID
            })
        }
    }
    async internal_Generate3() {
        this.queueStatus = new Map,
        clearTimeout(this.timeoutTimerHandle);
        let e = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        this.doGenerateAnimation && (this.imgArray = new Array);
        let t = this.generate3MultipleRemaining;
        this.updateETALabel();
        for (let i = 0; i < t; i++) {
            let a = 20;
            this.doGenerateAnimation ? a = i + 10 : e = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
            let r = 0
              , l = 0;
            this.variationsOnSeed && (e = this.variationSourceSeed,
            l = this.variationAmount,
            r = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
            let p = this._selectModel.options[this._selectModel.selectedIndex].value
              , d = await n.generateImage(this._promptBox.value, this._promptBoxNeg.value, e, a, p, r, l);
            if (d?.hasError) {
                if (d?.errorMessage == "Please sign in.") {
                    this._resultText.innerHTML = "Sign in to generate unlimited images. It's Free!!",
                    this.generationEnded(),
                    await o.info("Sign in to generate unlimited images. It's free and easy!!"),
                    await o.viewAccount();
                    return
                }
                if (d?.errorMessage == "Invalid Prompt") {
                    this.generationEnded(),
                    await o.info("Invalid Prompt. Try another prompt.");
                    return
                }
            }
            if (i == 0 && (this.savedPrompts.has(this._promptBox.value) || (this.savedPrompts.add(this._promptBox.value),
            this.localStorageObj.LastPrompt = new se,
            this.localStorageObj.LastPrompt.Model = p,
            this.localStorageObj.LastPrompt.Seed = e,
            this.localStorageObj.LastPrompt.Prompt = this._promptBox.value,
            this.localStorageObj.PromptHistory.unshift(this.localStorageObj.LastPrompt),
            this.localStorageObj.PromptHistory.length > 100 && this.localStorageObj.PromptHistory.pop(),
            this.saveLocalStorage(),
            this.loadPromptHistoryGUI(!0)),
            t > 1 ? this.localStorageObj.Count_Multi = (this.localStorageObj.Count_Multi || 0) + 1 : this.localStorageObj.Count_Single = (this.localStorageObj.Count_Single || 0) + 1,
            this.saveLocalStorage()),
            d.hasError)
                d.errorMessage && (this._resultText.innerHTML = d.errorMessage,
                this.generationEnded());
            else {
                let g = document.createElement("img");
                g.style.margin = "auto",
                g.style.cursor = "pointer",
                g.id = "img_" + d.payload.imageID,
                g.addEventListener("click", ()=>{
                    window.location.hash = "ai_" + d.payload.imageID
                }
                ),
                this._results.prepend(g),
                this.doGenerateAnimation && this.imgArray.push(g),
                this.pendingImages.add(d.payload.imageID),
                this._resultText.innerHTML = ""
            }
        }
        this.variationsOnSeed = !1,
        this._checkStatus(),
        this.timeoutTimerHandle = setTimeout(()=>{
            this._generate3.disabled = !1,
            this._generate3Multiple.disabled = !1,
            this.btnFeelingLucky.disabled = !1
        }
        , 8e5)
    }
    getPleaseWaitText() {
        let e = Math.floor(Math.random() * this.possiblePleaseWaitTexts.length);
        return this.possiblePleaseWaitTexts[e]
    }
    _onLoaded() {}
    async _checkStatus() {
        for (let e of Array.from(this.pendingImages)) {
            let t = await n.getImageStatus(e);
            if (console.log(t),
            !t.hasError) {
                if (t.payload.status === "pending")
                    this.queueStatus.set(e, t.payload.queuePosition),
                    this.updateETALabel();
                else if (t.payload.status === "generating")
                    this.queueStatus.set(e, t.payload.queuePosition),
                    this.updateETALabel();
                else if (t.payload.status === "failed")
                    this.queueStatus.delete(e),
                    this.pendingImages.delete(e),
                    this.generate3MultipleRemaining = this.pendingImages.size,
                    this.updateProgressText();
                else if (t.payload.status === "complete") {
                    this.resultBoxIsEmpty && (this.resultBoxIsEmpty = !1);
                    let i = document.getElementById("img_" + e);
                    i.src = t.payload.url,
                    this.pendingImages.delete(e),
                    this.queueStatus.delete(e),
                    this.generate3MultipleRemaining = this.pendingImages.size,
                    this.updateProgressText()
                }
            }
        }
        this.pendingImages.size == 0 ? (this._isGenerating = !1,
        this.generationEnded()) : setTimeout(()=>{
            this._checkStatus()
        }
        , 600)
    }
    get prompt() {
        return this._promptBox.value
    }
    set prompt(e) {
        this._promptBox.value = e
    }
}
;
var se = class {
}
;
window.customElements.define("a-generate3", Z);
var ee = class extends m {
    constructor() {
        super();
        this.resizeDebounceHandle = 0;
        this.numImageWidthNumber = 3;
        this.isRunningHighFPS = !1;
        this.lastRequestAnimationFrameId = 0;
        this.imageInfos = [];
        this.intervalHandle = 0;
        this.imageHeight = 0;
        this.imageWidth = 0;
        this.imageMargin = 10;
        this.pastImageContainers = [];
        this.isLoadingMoreImages = !1;
        this._earliestTimestamp = 99999999999999;
        this.itemsToSkipInQuery = 0;
        this.loadLocalStorage(),
        this.loadMoreImages = this.loadMoreImages.bind(this),
        this.internal_HighFPS = this.internal_HighFPS.bind(this),
        this.startHighFPS = this.startHighFPS.bind(this),
        this.stopHighFPS = this.stopHighFPS.bind(this),
        this.resizeHandler = this.resizeHandler.bind(this),
        this._isInitialized = !1,
        this.gridOptions = document.createElement("span"),
        this.gridOptions.style.position = "relative",
        this.gridOptions.style.top = "0px",
        this.gridOptions.style.left = "0px",
        this.gridOptions.style.width = "100%",
        this.gridOptions.style.height = "100px",
        this.appendChild(this.gridOptions),
        this._selectView = document.createElement("select"),
        this._selectView.style.backgroundColor = "black",
        this._selectView.style.color = "white",
        this._selectView.style.marginLeft = "10px",
        this._selectView.style.marginRight = "20px",
        this._selectView.style.position = "absolute",
        this._selectView.style.top = "5px",
        this._selectView.style.left = "0px",
        this._selectView.style.width = "120px",
        this.appendChild(this._selectView);
        {
            let i = document.createElement("option");
            i.value = "mycreations",
            i.text = "My Creations",
            this._selectView.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "public_images",
            i.text = "Public Images"
        }
        this._selectView.selectedIndex = 0,
        this._selectView.addEventListener("change", i=>{
            this.resetView()
        }
        );
        let e = document.createElement("input");
        e.type = "checkbox",
        e.style.position = "absolute",
        e.style.top = "5px",
        e.style.left = "100px",
        e.id = "autoScroll",
        e.setAttribute("hidden", "true");
        let t = document.createElement("label");
        t.setAttribute("for", "autoScroll"),
        t.textContent = "Auto Refresh",
        t.style.display = "block",
        t.style.position = "absolute",
        t.style.fontSize = "14px",
        t.style.color = "#f1f1f1",
        t.style.background = "#444444",
        t.style.left = "140px",
        t.style.top = "3px",
        t.style.width = "60px",
        t.style.textAlign = "center",
        t.style.height = "36px",
        t.style.borderRadius = "5px",
        e.addEventListener("input", ()=>{
            e.checked == !0 ? (this.startAutoScroll(),
            t.style.background = "#999999") : (this.cancelAutoScroll(),
            t.style.background = "#444444")
        }
        ),
        this.gridOptions.appendChild(e),
        this.gridOptions.appendChild(t),
        this.numImageWidth = document.createElement("input"),
        this.numImageWidth.style.position = "absolute",
        this.numImageWidth.style.left = "210px",
        this.numImageWidth.style.top = "5px",
        this.numImageWidth.style.width = "200px",
        this.numImageWidth.type = "range",
        this.numImageWidth.min = "1",
        this.numImageWidth.max = "10",
        this.numImageWidth.step = "1",
        this.numImageWidth.value = "3",
        this.numImageWidth.style.margin = "0px",
        this.numImageWidth.addEventListener("input", ()=>{
            this.resizeHandler()
        }
        ),
        this.gridOptions.appendChild(this.numImageWidth),
        this.searchBox = document.createElement("input"),
        this.searchBox.style.position = "absolute",
        this.searchBox.style.left = "0px",
        this.searchBox.style.top = "40px",
        this.searchBox.style.width = "100%",
        this.searchBox.type = "search",
        this.searchBox.addEventListener("keyup", i=>{
            i.key == "Enter" && this.resetView()
        }
        ),
        this.searchBox.addEventListener("focus", ()=>{
            this.searchBox.style.opacity = "0",
            setTimeout(()=>{
                this.searchBox.style.opacity = "1"
            }
            , 1)
        }
        ),
        this.viewPort = document.createElement("div"),
        this.viewPort.style.height = "100%",
        this.viewPort.style.width = "100%",
        this.viewPort.style.overflowY = "scroll",
        this.imgContainer = null,
        window.addEventListener("resize", ()=>{
            clearTimeout(this.resizeDebounceHandle),
            this.resizeDebounceHandle = setTimeout(()=>{
                this.resizeHandler()
            }
            , 100)
        }
        ),
        this.viewPortBottom = document.createElement("span"),
        this.viewPort.appendChild(this.viewPortBottom),
        this.viewPort.addEventListener("scroll", i=>{
            this.isLoadingMoreImages || this.viewPort.scrollHeight - this.viewPort.scrollTop - this.viewPort.clientHeight <= this.viewPort.clientHeight && this.loadMoreImages()
        }
        ),
        this.appendChild(this.viewPort)
    }
    resizeHandler() {
        this.numImageWidthNumber = Number.parseInt(this.numImageWidth.value);
        let e = 10;
        this.imageWidth = (window.innerWidth - e * (this.numImageWidthNumber + 1)) / this.numImageWidthNumber,
        this.imageHeight = this.imageWidth * (600 / 512);
        var t = document.querySelectorAll(".gridEL");
        t.forEach(a=>{
            a.style.height = this.imageHeight + "px",
            a.style.width = this.imageWidth + "px"
        }
        );
        var i = document.querySelectorAll(".gridELImg");
        i.forEach(a=>{
            let r = a.app_imgobj
              , l = a;
            if (r?.typ != "image")
                r?.url != null && (l.src = r.url);
            else if (this.imageWidth <= 128) {
                let p = c.getImageUrl25pct(r.url);
                l.src = p
            } else if (this.imageWidth <= 256) {
                let p = c.getImageUrl50pct(r.url);
                l.src = p
            } else
                l.src = r.url;
            a.style.height = this.imageHeight + "px",
            a.style.width = this.imageWidth + "px"
        }
        )
    }
    startHighFPS() {
        this.isRunningHighFPS || (this.isRunningHighFPS = !0,
        this.internal_HighFPS())
    }
    stopHighFPS() {
        this.isRunningHighFPS = !1,
        cancelAnimationFrame(this.lastRequestAnimationFrameId)
    }
    internal_HighFPS() {
        this.isRunningHighFPS && (this.lastRequestAnimationFrameId = requestAnimationFrame(this.internal_HighFPS))
    }
    loadLocalStorage() {
        try {
            let e = localStorage.getItem("Browse2_LS");
            e != null ? this.localStorageObj = JSON.parse(e) : this.localStorageObj = {}
        } catch {
            this.localStorageObj = {}
        }
    }
    saveLocalStorage() {
        let e = JSON.stringify(this.localStorageObj);
        localStorage.setItem("Browse2_LS", e)
    }
    async initialize() {
        this._isInitialized || (this._isInitialized = !0),
        await this.loadMoreImages()
    }
    cancelAutoScroll() {
        clearInterval(this.intervalHandle)
    }
    isInViewport(e) {
        let t = e.getBoundingClientRect();
        return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth)
    }
    getFirstVisibleImageContainer(e=0) {
        let t = this.viewPort.getBoundingClientRect().top;
        for (let i = 0; i < this.viewPort.children.length; i++) {
            let a = this.viewPort.children[i];
            if (a.getBoundingClientRect().bottom - t > e)
                return a
        }
    }
    scrollToNextPage() {
        let e = this.imageHeight + 10
          , t = this.getFirstVisibleImageContainer(this.imageHeight + 10);
        if (!t)
            return null;
        let i = this.imageHeight + this.imageMargin * 2
          , a = t.getBoundingClientRect().top
          , r = 0;
        for (let d = 0; d < t.children.length; d++) {
            let g = t.children[d]
              , v = g.getBoundingClientRect();
            if (console.log(v, this.viewPort.scrollTop),
            v.bottom - i > 0) {
                r = d;
                let I = g;
                break
            }
        }
        let l = Math.max(this.viewPort.getBoundingClientRect().height / (this.imageHeight + this.imageMargin * 2), 1)
          , p = Math.floor(this.numImageWidthNumber * l + 1);
        t.children.length - 1 >= r + p ? t.children[r + p].scrollIntoView({
            behavior: "smooth",
            block: "start"
        }) : t.lastElementChild && t.lastElementChild.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }
    startAutoScroll() {
        clearInterval(this.intervalHandle),
        this.scrollToNextPage(),
        this.intervalHandle = setInterval(()=>{
            this.scrollToNextPage()
        }
        , 2500)
    }
    resetView() {
        this.cancelAutoScroll(),
        this._earliestTimestamp = 99999999999999,
        this.isLoadingMoreImages = !1,
        this.imgContainer = null,
        this.pastImageContainers = [];
        for (let e = this.viewPort.children.length - 1; e >= 0; e--) {
            let t = this.viewPort.children[e];
            t != this.viewPortBottom && this.viewPort.removeChild(t)
        }
        this.imageInfos = [],
        this.itemsToSkipInQuery = 0,
        this.loadMoreImages()
    }
    async loadMoreImages() {
        if (this.isLoadingMoreImages)
            return;
        this.isLoadingMoreImages = !0;
        let e = null
          , t = !1;
        if (this.imgContainer) {
            if (this.imgContainer.childNodes.length < 250)
                t = !0;
            else if (this.pastImageContainers.length >= 5)
                for (; this.pastImageContainers.length >= 4; )
                    e = this.pastImageContainers.shift(),
                    e.style.height = e.offsetHeight + "px",
                    e.innerHTML_OLD = e.innerHTML,
                    e.innerHTML = "The images here have been removed to conserve memory and increase performance.<br/><br/>Click anywhere in the empty space to reload the exact images removed...",
                    e.style.backgroundImage = "url('/img/refresh-icon.svg')",
                    e.style.backgroundRepeat = "space",
                    e.style.backgroundSize = "33%",
                    e.addEventListener("click", d=>{
                        d.target && d.target.innerHTML_OLD && (d.target.innerHTML = d.target.innerHTML_OLD,
                        delete d.target.innerHTML_OLD,
                        e.style.backgroundImage = "")
                    }
                    )
        }
        t || (this.imgContainer = document.createElement("span"),
        this.imgContainer.style.display = "flex",
        this.imgContainer.style.flexWrap = "wrap",
        this.viewPort.insertBefore(this.imgContainer, this.viewPortBottom),
        this.pastImageContainers.push(this.imgContainer));
        let i = this.searchBox.value.trim();
        i = i.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
        let a = 150, r;
        this._selectView.selectedIndex == 0 ? n.self.userID == null ? r = [] : (console.log("getmycreations: api slef: ", n.self),
        r = await n.getMyCreations(this.itemsToSkipInQuery, a, this.searchBox.value, n.self.userID, n.self.sessionID, "image"),
        console.log("getmycreations Done: ", r),
        this.itemsToSkipInQuery += r.length) : this._selectView.selectedIndex == 1 ? (r = await n.getLatestImagesWithSearch(this.itemsToSkipInQuery, a, this.searchBox.value, null, "image"),
        this.itemsToSkipInQuery += r.length) : this._selectView.selectedIndex == 2 && (r = await n.getLatestImagesWithSearch(this.itemsToSkipInQuery, a, this.searchBox.value, null, "video"),
        this.itemsToSkipInQuery += r.length),
        this.imageInfos = r;
        let l = Number.parseInt(this.numImageWidth.value)
          , p = 10;
        this.imageWidth = (window.innerWidth - p * (l + 1)) / l,
        this.imageHeight = this.imageWidth * (600 / 512);
        for (let d = 0; d < this.imageInfos.length; d++) {
            let g = this.imageInfos[d];
            this._earliestTimestamp = g.completedDate;
            let v = document.createElement("span");
            v.style.height = this.imageHeight + "px",
            v.style.width = this.imageWidth + "px",
            v.style.margin = "5px",
            v.style.borderRadius = "5px",
            v.style.overflow = "hidden",
            v.classList.add("gridEL"),
            v.app_imgid = g.id;
            let I = document.createElement("img");
            I.classList.add("gridELImg"),
            I.id = "img_" + g.id;
            let w = "";
            g?.typ != "image" ? w = g.url : this.imageWidth <= 128 ? w = c.getImageUrl25pct(g.url) : this.imageWidth <= 256 ? w = c.getImageUrl50pct(g.url) : w = g.url,
            I.src = w,
            I.style.width = "100%",
            I.style.height = "100%",
            I.app_imgid = g.id,
            I.app_imgobj = g,
            v.appendChild(I),
            I.addEventListener("click", ae=>{
                o.viewImage(ae.target.app_imgid)
            }
            ),
            this.imgContainer.appendChild(v)
        }
        setTimeout(()=>{
            this.isLoadingMoreImages = !1
        }
        , 100)
    }
    _onLoaded() {}
}
;
window.customElements.define("a-browse2", ee);
var te = class extends m {
    constructor() {
        super();
        this.generate4ButtonText = "Generate Video";
        this.frameImages = new Set;
        this.pendingVideoId = null;
        this.imgPreviewImage = null;
        this.savedPrompts = new Set;
        this.resultBoxIsEmpty = !1;
        this.isGenerating = !1;
        this.generate4MultipleRemaining = 0;
        this.generate4MultiCount = 1;
        this.imgArray = new Array;
        this.isPendingLoad = !1;
        this.nextLoadUrl = null;
        this.totalFrameCount = 0;
        this.loadedFrameNum = -1;
        this.loadLocalStorage(),
        this.internal_Generate4 = this.internal_Generate4.bind(this),
        this._isInitialized = !1,
        this._isGenerating = !1,
        this._resultText = document.createElement("span"),
        this._resultText.style.textAlign = "center",
        this._resultText.style.fontSize = "0.8em",
        this._resultText.innerText = "",
        this.appendChild(this._resultText),
        this._selectModel = document.createElement("select"),
        this._selectModel.style.backgroundColor = "black",
        this._selectModel.style.color = "white",
        this._selectModel.style.display = "none",
        this._selectModel.style.marginLeft = "30px",
        this._selectModel.style.marginRight = "30px",
        this.appendChild(this._selectModel);
        {
            let i = document.createElement("option");
            i.value = "model3",
            i.text = "Realistic /  Artistic   [Deliberate]",
            this._selectModel.appendChild(i)
        }
        this._selectModel.setAttribute("data-clarity-unmask", "true");
        let e = document.createElement("div");
        e.classList.add("prompt"),
        this.appendChild(e),
        this._promptBox = new y,
        this._promptBox.value = "sexy woman",
        this._promptBox.setAttribute("data-clarity-unmask", "true"),
        e.appendChild(this._promptBox),
        this._selectAnimation = document.createElement("select"),
        this._selectAnimation.style.backgroundColor = "black",
        this._selectAnimation.style.color = "white",
        this._selectAnimation.style.marginLeft = "30px",
        this._selectAnimation.style.marginRight = "30px",
        this.appendChild(this._selectAnimation);
        {
            let i = document.createElement("option");
            i.value = "vid1",
            i.text = "1 - Shirt Lift | Titty Flash",
            this._selectAnimation.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "vid2",
            i.text = "2 - Shirt Lift 2 | Titty Flash 2",
            this._selectAnimation.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "vid3",
            i.text = "3 - Deep Throat BJ",
            this._selectAnimation.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "vid4",
            i.text = "4 - Hair Pull BJ",
            this._selectAnimation.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "vid5",
            i.text = "5 - Solo Titty Love",
            this._selectAnimation.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "vid6",
            i.text = "6 - Doggie Style Begging",
            this._selectAnimation.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "vid7",
            i.text = "7 - Throat Fucking | Forced BJ",
            this._selectAnimation.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "vid8",
            i.text = "8 - Sofa Sex",
            this._selectAnimation.appendChild(i)
        }
        {
            let i = document.createElement("option");
            i.value = "vid10",
            i.text = "10 - Best Titty Fuck",
            this._selectAnimation.appendChild(i)
        }
        let t = document.createElement("span");
        t.style.alignSelf = "center",
        this._generate4 = document.createElement("button"),
        this._generate4.style.width = "150px",
        this._generate4.style.height = "30px",
        this._generate4.style.fontWeight = "bold",
        this._generate4.textContent = this.generate4ButtonText,
        t.appendChild(this._generate4),
        t.appendChild(document.createTextNode("\xA0\xA0")),
        this._btnAnimate = document.createElement("button"),
        this._btnAnimate.style.width = "150px",
        this._btnAnimate.style.height = "30px",
        this._btnAnimate.style.fontWeight = "bold",
        this._btnAnimate.style.display = "none",
        this._btnAnimate.textContent = "Start Animation",
        t.appendChild(this._btnAnimate),
        this.appendChild(t),
        this.bottomStatusLabel = document.createElement("span"),
        this.appendChild(this.bottomStatusLabel),
        this._results = document.createElement("div"),
        this._results.style.width = "100%",
        this._results.style.display = "flex",
        this._results.style.flexFlow = "row wrap",
        this.appendChild(this._results),
        this._onGenerate4 = this._onGenerate4.bind(this),
        this._generate4.addEventListener("click", this._onGenerate4),
        this._onLoaded = this._onLoaded.bind(this)
    }
    doDemo() {
        this._promptBox.value = "attractive woman, tongue out",
        this._onGenerate4()
    }
    loadLocalStorage() {
        this.localStorageObj = {},
        this.localStorageObj.PromptHistory = new Array,
        this.localStorageObj.LastPrompt = null;
        return;
        try {
            let e = localStorage.getItem("Generate4_LS");
            if (e != null) {
                this.localStorageObj = JSON.parse(e);
                for (let t of this.localStorageObj.PromptHistory)
                    this.savedPrompts.add(t.Prompt)
            } else
                this.localStorageObj = {},
                this.localStorageObj.PromptHistory = new Array,
                this.localStorageObj.LastPrompt = null
        } catch {
            this.localStorageObj = {},
            this.localStorageObj.PromptHistory = new Array,
            this.localStorageObj.LastPrompt = null
        }
    }
    saveLocalStorage() {
        let e = JSON.stringify(this.localStorageObj);
        localStorage.setItem("Generate4_LS", e)
    }
    async initialize() {
        this._isInitialized || (this._isInitialized = !0)
    }
    generationStarted() {
        for (; this._results.firstChild; )
            this._results.removeChild(this._results.firstChild);
        this.imgPreviewImage = null,
        this.resultBoxIsEmpty = !0,
        this.bottomStatusLabel.innerHTML = "Please wait Generating.<br/>This process requires a lot of GPU processing time. Please wait...",
        this.frameImages.clear(),
        this.totalFrameCount = 0,
        this.imgArray = new Array,
        this.isGenerating = !0,
        this._generate4.disabled = !0,
        this.updateProgressText()
    }
    async updateETALabel() {
        try {
            let t = (await n.getLastCompletedImage("video")).payload.lastCompletedImage
              , i = Date.parse(t.completedDate) - Date.parse(t.startedDate);
            i = i / 1e3,
            this.bottomStatusLabel.innerHTML = "The AI is Generating your video...<br/>This process may take some time."
        } catch {}
    }
    updateProgressText() {
        this._generate4.textContent = "Please wait..."
    }
    generationEnded() {
        this.isGenerating = !1,
        this._generate4.disabled = !1,
        this._generate4.textContent = this.generate4ButtonText,
        this.generate4MultipleRemaining = 0,
        this.bottomStatusLabel.innerHTML = ""
    }
    async _onGenerate4() {
        this.isGenerating || await o.checkForPro() != !1 && (this.generate4MultipleRemaining = 1,
        this.generationStarted(),
        this.internal_Generate4(),
        n.trackEvent("generateVideo", {
            userID: n?.self?.userID
        }))
    }
    async internal_Generate4() {
        let e = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        this.imgArray = new Array;
        let t = this.generate4MultipleRemaining;
        this.updateETALabel();
        let i = 20
          , a = this._selectModel.options[this._selectModel.selectedIndex].value
          , r = this._selectAnimation.options[this._selectAnimation.selectedIndex].value
          , l = "default";
        r == "vid1" ? l = "preset1" : r == "vid2" ? l = "preset2" : r == "vid3" ? l = "preset3" : r == "vid4" ? l = "preset4" : r == "vid5" ? l = "preset5" : r == "vid6" || (r == "vid7" ? l = "preset4" : r == "vid8" ? l = "preset8" : r == "vid9" ? l = "preset9" : r == "vid10" && (l = "preset10"));
        let p = await n.generateVideo(this._promptBox.value, e, i, a, r, l);
        if (this.generate4MultipleRemaining = this.generate4MultiCount,
        p?.hasError) {
            if (await o.info(p?.errorMessage),
            p?.errorMessage == "Please sign in.") {
                this.generationEnded(),
                this._resultText.innerHTML = "Sign in to generate unlimited images. It's Free!!",
                await o.info("Sign in to generate unlimited images. It's free and easy!!"),
                await o.viewAccount();
                return
            }
            if (p?.errorMessage == "Invalid Prompt") {
                this.generationEnded(),
                await o.info("Invalid Prompt. Try another prompt.");
                return
            }
        }
        this.savedPrompts.has(this._promptBox.value) || (this.savedPrompts.add(this._promptBox.value),
        this.localStorageObj.LastPrompt = new oe,
        this.localStorageObj.LastPrompt.Model = a,
        this.localStorageObj.LastPrompt.Seed = e,
        this.localStorageObj.LastPrompt.Prompt = this._promptBox.value,
        this.localStorageObj.PromptHistory.unshift(this.localStorageObj.LastPrompt),
        this.localStorageObj.PromptHistory.length > 100 && this.localStorageObj.PromptHistory.pop(),
        this.saveLocalStorage()),
        t > 1 ? this.localStorageObj.Count_Multi = (this.localStorageObj.Count_Multi || 0) + 1 : this.localStorageObj.Count_Single = (this.localStorageObj.Count_Single || 0) + 1,
        this.saveLocalStorage(),
        p.hasError ? p.errorMessage && (this._resultText.innerHTML = p.errorMessage,
        this.generationEnded()) : (this.pendingVideoId = p.payload.imageID,
        this._resultText.innerHTML = ""),
        this._resultText.innerHTML = "",
        this._checkStatus()
    }
    _onLoaded() {}
    async _checkStatus() {
        if (this.pendingVideoId) {
            try {
                let e = await n.getImageStatus(this.pendingVideoId);
                if (!e?.payload) {
                    this.bottomStatusLabel.innerText = Date.now() + " ERR, " + JSON.stringify(e);
                    return
                }
                if (!e?.hasError && e?.payload) {
                    if (e.payload.status === "generating") {
                        if (e.payload.frames && e.payload.frames.length > 0) {
                            let t = e.payload.frames[e.payload.frames.length - 1];
                            this.totalFrameCount == 0 && (this.totalFrameCount = Number(t.frameCount));
                            let i = t.frameNumber + 1;
                            this.loadedFrameNum != i && (this.imgPreviewImage == null ? (this.imgPreviewImage = document.createElement("img"),
                            this.imgPreviewImage.addEventListener("load", a=>{
                                this.isPendingLoad = !1,
                                this.nextLoadUrl != null && (this.isPendingLoad = !0,
                                this.imgPreviewImage.src = this.nextLoadUrl,
                                this.nextLoadUrl = null)
                            }
                            ),
                            this.imgPreviewImage.style.margin = "auto",
                            this.isPendingLoad = !0,
                            this.nextLoadUrl = null,
                            this.imgPreviewImage.src = t.publicImageUrl,
                            this._results.prepend(this.imgPreviewImage)) : (this.imgPreviewImage.style.display = "",
                            this.isPendingLoad ? this.nextLoadUrl = t.publicImageUrl : (this.nextLoadUrl = null,
                            this.isPendingLoad = !0,
                            this.imgPreviewImage.src = t.publicImageUrl)),
                            this.loadedFrameNum = i,
                            this.bottomStatusLabel.innerHTML = "Generating Now... Frame: " + (Number(this.loadedFrameNum) + 1) + " of " + (Number(this.totalFrameCount) + 1))
                        }
                    } else if (e.payload.status === "failed")
                        this.updateProgressText();
                    else if (e.payload.status === "complete") {
                        this.imgPreviewImage.style.display = "none";
                        let t = document.createElement("img");
                        t.style.margin = "auto",
                        t.style.cursor = "pointer",
                        t.id = this.pendingVideoId,
                        t.addEventListener("click", ()=>{
                            window.location.hash = "ai_" + this.pendingVideoId
                        }
                        ),
                        t.src = e.payload.url,
                        this._results.prepend(t),
                        this.updateProgressText(),
                        this.bottomStatusLabel.innerHTML = "Generation complete! Thank you!",
                        this.generationEnded();
                        return
                    }
                }
            } catch (e) {
                console.log("ERR:", e),
                this.bottomStatusLabel.innerText = Date.now() + ", ERROR: " + e + ", " + JSON.stringify(e)
            }
            setTimeout(()=>{
                this._checkStatus()
            }
            , 333)
        }
    }
    get prompt() {
        return this._promptBox.value
    }
    set prompt(e) {
        this._promptBox.value = e
    }
}
;
var oe = class {
}
;
window.customElements.define("a-generate4", te);
var ie = class extends m {
    constructor() {
        super();
        this.resizeDebounceHandle = 0;
        this.numImageWidthNumber = 3;
        this.imageInfos = [];
        this.intervalHandle = 0;
        this.imageHeight = 700;
        this.imageWidth = 512;
        this.isLoadingMoreImages = !1;
        this.itemsToSkipInQuery = 0;
        this.loadLocalStorage(),
        this.loadMoreImages = this.loadMoreImages.bind(this),
        this.resizeHandler = this.resizeHandler.bind(this),
        this._isInitialized = !1,
        this.gridOptions = document.createElement("span"),
        this.gridOptions.style.position = "relative",
        this.gridOptions.style.top = "0px",
        this.gridOptions.style.left = "0px",
        this.gridOptions.style.width = "100%",
        this.gridOptions.style.height = "100px",
        this.appendChild(this.gridOptions);
        let e = document.createElement("input");
        e.type = "checkbox",
        e.style.position = "absolute",
        e.style.top = "5px",
        e.style.left = "20px",
        e.id = "autoRefresh",
        e.setAttribute("hidden", "true");
        let t = document.createElement("label");
        t.setAttribute("for", "autoRefresh"),
        t.textContent = "Auto Refresh",
        t.style.display = "block",
        t.style.position = "absolute",
        t.style.fontSize = "14px",
        t.style.color = "#f1f1f1",
        t.style.background = "#444444",
        t.style.left = "10px",
        t.style.top = "3px",
        t.style.paddingTop = "3px",
        t.style.width = "60px",
        t.style.textAlign = "center",
        t.style.height = "24px",
        t.style.borderRadius = "5px",
        e.addEventListener("input", ()=>{
            e.checked == !0 ? t.style.background = "#999999" : t.style.background = "#444444"
        }
        ),
        this.gridOptions.appendChild(e),
        this.gridOptions.appendChild(t),
        this.numImageWidth = document.createElement("input"),
        this.numImageWidth.style.position = "absolute",
        this.numImageWidth.style.left = "80px",
        this.numImageWidth.style.top = "0px",
        this.numImageWidth.style.width = "120px",
        this.numImageWidth.type = "range",
        this.numImageWidth.min = "1",
        this.numImageWidth.max = "10",
        this.numImageWidth.step = "1",
        this.numImageWidth.value = "6",
        this.numImageWidth.style.margin = "0px",
        this.numImageWidth.addEventListener("input", ()=>{
            this.resizeHandler()
        }
        ),
        this.gridOptions.appendChild(this.numImageWidth),
        this.searchBox = document.createElement("input"),
        this.searchBox.style.position = "absolute",
        this.searchBox.style.left = "0px",
        this.searchBox.style.top = "30px",
        this.searchBox.style.width = "100%",
        this.searchBox.type = "search",
        this.searchBox.addEventListener("keyup", i=>{
            i.key == "Enter"
        }
        ),
        this.searchBox.addEventListener("focus", ()=>{
            this.searchBox.style.opacity = "0",
            setTimeout(()=>{
                this.searchBox.style.opacity = "1"
            }
            , 1)
        }
        ),
        this.gridOptions.appendChild(this.searchBox),
        this.viewPort = document.createElement("div"),
        this.viewPort.style.height = "100%",
        this.viewPort.style.width = "100%",
        this.viewPort.style.overflowY = "hidden",
        window.addEventListener("resize", ()=>{
            clearTimeout(this.resizeDebounceHandle),
            this.resizeDebounceHandle = setTimeout(()=>{
                this.resizeHandler()
            }
            , 100)
        }
        ),
        this.viewPortBottom = document.createElement("span"),
        this.viewPort.appendChild(this.viewPortBottom),
        this.appendChild(this.viewPort)
    }
    resizeHandler() {
        return;
        var t, i
    }
    loadLocalStorage() {
        try {
            let e = localStorage.getItem("Browse3_LS");
            e != null ? this.localStorageObj = JSON.parse(e) : this.localStorageObj = {}
        } catch {
            this.localStorageObj = {}
        }
    }
    saveLocalStorage() {
        let e = JSON.stringify(this.localStorageObj);
        localStorage.setItem("Browse3_LS", e)
    }
    async initialize() {
        this._isInitialized || (this._isInitialized = !0),
        await this.loadMoreImages()
    }
    createImageElement() {
        let e = document.createElement("span");
        e.style.height = this.imageHeight + "px",
        e.style.width = this.imageWidth + "px",
        e.style.margin = "5px",
        e.style.borderRadius = "5px",
        e.style.overflow = "hidden",
        e.classList.add("gridEL");
        let t = document.createElement("img");
        return t.classList.add("gridELImg"),
        t.style.width = "100%",
        t.style.height = "100%",
        e.appendChild(t),
        t.addEventListener("click", i=>{
            o.viewImage(i.target.app_imgid)
        }
        ),
        e
    }
    async loadMoreImages() {
        if (this.isLoadingMoreImages)
            return;
        this.isLoadingMoreImages = !0;
        let e = this.searchBox.value.trim();
        e = e.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
        let t = 150, i;
        e.length > 0 ? (i = await n.getLatestImagesWithSearch(this.itemsToSkipInQuery, t, this.searchBox.value),
        this.itemsToSkipInQuery += t) : i = await n.getSampleImages(t),
        this.isLoadingMoreImages = !1
    }
    _onLoaded() {}
}
;
window.customElements.define("a-browse3", ie);
var le = class extends m {
    constructor() {
        super();
        this.rs = "";
        this.currentViewImage = null;
        n.application = this,
        globalThis.application = this,
        this.doDemo = this.doDemo.bind(this),
        this.closeDemo = this.closeDemo.bind(this),
        this._header = new U,
        this._header.classList.add("invisible"),
        this.appendChild(this._header),
        this._content = new N,
        this.appendChild(this._content),
        this._browse = new V,
        this._browse.classList.add("invisible"),
        this._content.appendChild(this._browse),
        this._generate = new J,
        this._generate.classList.add("invisible"),
        this._content.appendChild(this._generate),
        this._generate2 = new K,
        this._generate2.classList.add("invisible"),
        this._content.appendChild(this._generate2),
        this._generate3 = new Z,
        this._generate3.classList.add("invisible"),
        this._content.appendChild(this._generate3),
        this._generate4 = new te,
        this._generate4.classList.add("invisible"),
        this._content.appendChild(this._generate4),
        this._browse2 = new ee,
        this._browse2.classList.add("invisible"),
        this._content.appendChild(this._browse2),
        this._browse3 = new ie,
        this._browse3.classList.add("invisible"),
        this._content.appendChild(this._browse3),
        this._curate = new X,
        this._curate.classList.add("invisible"),
        this._content.appendChild(this._curate),
        document.addEventListener("appLoadComplete", this._onAppLoadComplete.bind(this)),
        document.addEventListener("click", this._onClick.bind(this)),
        this._onHashChanged = this._onHashChanged.bind(this),
        window.addEventListener("hashchange", this._onHashChanged),
        this.doRefSource(),
        this._initialize()
    }
    static get instance() {
        return this._instance || (this._instance = new le),
        this._instance
    }
    doRefSource() {
        let e = [];
        if (localStorage.getItem("refList") != null)
            try {
                e = JSON.parse(localStorage.getItem("refList"))
            } catch {}
        if (document?.referrer && document?.referrer.length > 1) {
            e.push(document.referrer),
            e = [...new Set(e)];
            let t = JSON.stringify(e);
            for (; t.length > 4096; )
                e.pop(),
                t = JSON.stringify(e);
            localStorage.setItem("refList", t)
        }
    }
    getDemoCount() {
        try {
            return localStorage.getItem("demoCount") == null ? 0 : Number.parseInt(localStorage.getItem("demoCount"))
        } catch {}
        return 0
    }
    doDemo() {
        this.closeDemo();
        let e = this.getDemoCount();
        this.view = "generate3",
        n.trackEvent("Demo_Generate" + e.toString(), {}),
        this._activeContent.doDemo()
    }
    closeDemo() {
        let e = this.getDemoCount();
        localStorage.setItem("demoCount", (e + 1).toString()),
        document.getElementById("generateHelpPopUp") && (document.getElementById("generateHelpPopUp").style.display = "none"),
        n.trackEvent("Close Demo " + e.toString(), {})
    }
    closeDemo_BrowsePics() {
        let e = this.getDemoCount();
        localStorage.setItem("demoCount", (e + 1).toString()),
        document.getElementById("generateHelpPopUp") && (document.getElementById("generateHelpPopUp").style.display = "none"),
        this.view = "browse3",
        n.trackEvent("Demo_BrowsePics" + e.toString(), {})
    }
    async _initialize() {
        await n.initialize();
        try {
            n.trackEvent("AppInit", {
                self: n?.self,
                loc: window.location.search
            });
            let e = new Proxy(new URLSearchParams(window.location.search),{
                get: (t,i)=>t.get(String(i))
            });
            e?.rs && (this.rs = e?.rs,
            n.trackEvent("RS_" + this.rs, null)),
            document?.referrer && n.trackEvent("RS2_" + document?.referrer, null)
        } catch {
            n.trackEvent("AppInitErr", {
                loc: window.location.search
            })
        }
    }
    async _onAppLoadComplete() {
        await this._header.initialize(),
        this._header.classList.remove("invisible"),
        this.view = "generate3"
    }
    _onClick(e) {
        let t = e.target;
        if (t.hasAttribute("data-account"))
            o.viewAccount();
        else if (t.hasAttribute("data-sign-up"))
            o.signUp();
        else if (t.hasAttribute("data-sign-in"))
            o.signIn();
        else if (t.hasAttribute("data-view")) {
            let i = t.getAttribute("data-view");
            this.view = i
        } else if (t.hasAttribute("data-folder")) {
            let i = t.getAttribute("data-folder");
            this._view === "browse" ? this._browse.setSelectedFolder(i) : this._view === "curate" && this._curate.setSelectedFolder(i)
        } else if (t.hasAttribute("data-create-folder"))
            n.isAuthenticated && o.createFolder();
        else if (t.hasAttribute("data-model")) {
            let i = t.getAttribute("data-model");
            this._generate.setSelectedModel(i)
        } else if (t.hasAttribute("data-view-image")) {
            let i = t.getAttribute("data-image");
            window.location.hash = "ai_" + i
        } else if (t.hasAttribute("data-report-image"))
            (async()=>{
                let a = t.getAttribute("data-report-image");
                await o.confirm("Are you sure you want to report this image?<br/>Please only report images that violate the terms.") && this._reportImage(a)
            }
            )();
        else if (t.hasAttribute("data-share-image")) {
            let i = t.getAttribute("data-share-image");
            o.shareImage(i)
        } else if (t.hasAttribute("data-prompt-info"))
            o.promptInfo();
        else if (t.hasAttribute("data-prompt")) {
            let i = t.getAttribute("data-prompt");
            this._generate.prompt = i
        } else if (t.hasAttribute("data-add-image-to-folder")) {
            let i = t.getAttribute("data-add-image-to-folder");
            o.addImageToSelfFolder(i)
        } else
            t.hasAttribute("data-refresh-browse") ? this._browse.refresh() : t.hasAttribute("data-refresh-curate") ? this._curate.refresh() : t.hasAttribute("data-contact") ? o.contact() : t.hasAttribute("data-models") && o.models()
    }
    async _setSelectedView(e) {
        this._view = e;
        let t = null;
        if (e === "browse" ? t = this._browse : e === "generate" ? (this._generate.initialize(),
        t = this._generate) : e === "curate" ? (this._curate.initialize(),
        t = this._curate) : e === "generate2" ? (this._generate2.initialize(),
        t = this._generate2) : e === "generate3" ? (this._generate3.initialize(),
        t = this._generate3) : e === "generate4" ? (this._generate4.initialize(),
        t = this._generate4) : e === "browse2" ? (this._browse2.initialize(),
        t = this._browse2) : e === "browse3" && (this._browse3.initialize(),
        t = this._browse3),
        this._activeContent) {
            this._content.ontransitionend = ()=>{
                this._content.ontransitionend = null,
                t && t.classList.remove("invisible")
            }
            ;
            for (let i of this._content.children)
                i.classList.add("invisible")
        } else
            t && t.classList.remove("invisible");
        this._activeContent = t,
        this._header.setSelectedView(e)
    }
    async _onHashChanged(e) {
        if (this.currentViewImage = null,
        console.log(e.newURL, e.oldURL),
        e.newURL !== e.oldURL) {
            let t = (window.location.hash || "").replace("#ai_", "");
            t.length > 6 && (this.currentViewImage = await o.viewImage(t))
        }
    }
    async _reportImage(e) {
        if (!0) {
            n.reportImage(e);
            for (let i of document.querySelectorAll(`*[data-image="${e}"]`))
                i.constructor === HTMLImageElement && (i.src = "./img/removed.png");
            this.currentViewImage != null && this.currentViewImage.close()
        }
    }
    get view() {
        return this._view
    }
    set view(e) {
        this._view !== e && this._setSelectedView(e)
    }
    authChanged() {
        this._generate3.authChanged()
    }
}
  , _ = le;
_.entity = "sexy.ai";
window.customElements.define("a-application", _);
window.addEventListener("load", ()=>{
    document.body.appendChild(_.instance)
}
);
console.log(_.entity);
