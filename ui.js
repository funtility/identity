class FuntilityUI
{
    constructor(funtilityApi)
    {
        if(funtilityApi === null) throw "FuntilityUI requires an instance of the FuntilityAPI."
        this.api = funtilityApi
        this.form = {}
        this.senderEmail = ""
        this.init()
    }

    //#region Initialize

    init()
    {
        let div = document.createElement('div')
        if (this.api.userIsSignedIn)
        {
            div.appendChild(this.userNameButton)
        } else {
            div.appendChild(this.signInButton)
        }
        let ele = document.getElementById('funtility')
        ele.innerHTML = null
        ele.appendChild(div)
    }

    get userNameButton()
    {
        let span = document.createElement('span')
        span.innerText = this.api.state.userName
        
        let div = document.createElement('div')
        div.style.display = 'inline-flex'
        div.appendChild(span)
        div.appendChild(this.signOutButon)
        return div
    }

    get signOutButon()
    {
        let span = document.createElement('span')
        span.title = 'Log Out'
        span.classList.add('fnt-hover')
        span.classList.add('fnt-log-out')
        span.addEventListener('click', () => {
            if(confirm("Are you sure you want to sign out?"))
            {
                this.api.signOut()
                location.reload()
            }
        })
        return span
    }

    get signInButton()
    {
        let span = document.createElement('span')
        span.style.cursor = 'pointer'
        span.innerText = 'Sign In'
        span.addEventListener('click', () => { 
            this.showModal(this.SignInContainer)
            document.getElementById('email').focus()
        })
        return span
    }

    //#endregion

    //#region FORM: Sign Up

    // get SignUpContainer()
    // {
    //     document.getElementById('email')?.remove()
    //     document.getElementById('username')?.remove()

    //     let hdr = document.createElement('div')
    //     hdr.classList.add('xlg')
    //     hdr.innerText = 'Sign Up For'
        
    //     let app = document.createElement('div')
    //     app.classList.add('xlg')
    //     app.classList.add('bold')
    //     app.innerText = this.api.appName

    //     let br = document.createElement('br')
    //     br.classList.add('fnt-hgt-20')

    //     let inEmail = document.createElement('input')
    //     inEmail.setAttribute('type','email')
    //     inEmail.placeholder = 'Email'
    //     inEmail.id = 'email'
    //     inEmail.classList.add('fnt-input')
    //     inEmail.classList.add('fnt-wid-200')

    //     let iVal1 = document.createElement('div')
    //     iVal1.id = 'emailValid'
    //     iVal1.classList.add('fnt-hgt-20')

    //     let inUser = document.createElement('input')
    //     inUser.setAttribute('type','text')
    //     inUser.placeholder = 'User Name'
    //     inUser.id = 'username'
    //     inUser.classList.add('fnt-input')
    //     inUser.classList.add('fnt-wid-200')

    //     let iVal2 = document.createElement('div')
    //     iVal2.id = 'usernameValid'
    //     iVal2.classList.add('fnt-hgt-20')

    //     let btn = document.createElement('button')
    //     btn.id = 'signUpFormButton'
    //     btn.classList.add('fnt-button')
    //     btn.classList.add('fnt-wid-200')
    //     btn.classList.add('xxlg')
    //     btn.classList.add('tx-ctr')
    //     btn.innerText = 'Submit'
    //     btn.addEventListener('click', () => { this.requestAccount() })

    //     return this.generateFormContainer([hdr,app,br,inEmail,iVal1,inUser,iVal2,btn])
    // }

    // requestAccount()
    // {
    //     let form = this.signUpForm
    //     if (form.isValid())
    //     {
    //         this.showModal(this.ProcessingContainer, false)
    //         this.api.POST_Account(form.email,form.username)
    //         .then((res) => {
    //             if(res.errors.length > 0) {
    //                 this.deleteModal()
    //                 res.errors.forEach((err) => {
    //                     this.showEphemeralMessage('fnt-msg-cntr',err)
    //                 })
    //             } else {
    //                 this.showModal(this.SignInContainer)
    //             }
    //         })
    //     }
    // }

    // get signUpForm()
    // {
    //     let email = this.getInputValue('email')
    //     let username = this.getInputValue('username')
    //     if(username === null) username == ''
    //     username = username.trim()

    //     let isValid = () => {
    //         let result = true
    //         if (!this.isValidEmail(email)) {
    //             result = false
    //             if (document.getElementById('emailValid').childElementCount === 0)
    //             {
    //                 this.showEphemeralMessage('emailValid','Invalid Email')
    //             }
    //         }
    //         if (username === '') {
    //             result = false
    //             if (document.getElementById('usernameValid').childElementCount === 0)
    //             {
    //                 this.showEphemeralMessage('usernameValid','User Name is required.')
    //             }
    //         }
    //         return result
    //     }

    //     return {
    //         'email': email,
    //         'username': username,
    //         'isValid': isValid
    //     }
    // }

    //#endregion

    //#region FORM: Sign In

    get SignInContainer()
    {
        let fieldset = document.createElement('fieldset')
        fieldset.classList.add('fnt-fieldset')

        let legend = document.createElement('legend')
        legend.innerText = 'Sign In'
        
        let info = document.createElement('div')
        info.innerText = "Enter your registered email address and we'll send you a sign in code."

        let inp = document.createElement('input')
        inp.type = 'email'
        inp.id = 'email'
        inp.classList.add('fnt-input')
        inp.placeholder = 'Email'
        inp.value = this.api.savedEmail
        inp.addEventListener('keyup', (event) => {
            if (event.key == 'Enter') {
                this.requestSignInCode()   
            }
        })

        let iVal = document.createElement('div')
        iVal.id = 'fnt-valid'
        iVal.style.height = '20px'
        
        let skip = document.createElement('a')
        skip.innerText = 'I already have a code.'
        skip.addEventListener('click', () => { this.showModal(this.EnterCodeContainer) })

        fieldset.appendChild(legend)
        fieldset.appendChild(info)
        fieldset.appendChild(inp)
        fieldset.appendChild(iVal)
        fieldset.appendChild(skip)

        return this.generateFormContainer([fieldset])
    }

    requestSignInCode()
    {
        let form = this.signInForm
        if (form.isValid())
        {
            this.showModal(this.ProcessingContainer, false)
            this.api.GET_LoginCode(form.email)
            .then((res) => {
                if(res.errors.length > 0) {
                    this.showModal(this.ErrorContainer(res.errors[0]),false)
                    setTimeout(()=>{
                        this.showModal(this.SignInContainer)
                    },3000)
                } else {
                    this.form = res.result
                    if (this.api.userIsSignedIn) {
                        location.reload()
                    } else {
                        this.showModal(this.EnterCodeContainer)
                    }
                }
            })
        }
    }

    get signInForm()
    {
        let email = this.getInputValue('email')

        let isValid = () => {
            let result = true
            if (!this.isValidEmail(email)) {
                result = false
                if (document.getElementById('emailValid').childElementCount === 0)
                {
                    this.showErrorMessage('Invalid Email')
                }
            }
            return result
        }

        return {
            'email': email,
            'isValid': isValid
        }
    }

    //#endregion

    //#region FORM: Enter Code

    get EnterCodeContainer()
    {
        let fieldset = document.createElement('fieldset')
        fieldset.classList.add('fnt-fieldset')

        let legend = document.createElement('legend')
        legend.innerText = 'Enter Code'
        
        let info = document.createElement('div')
        info.innerText = 'If that email address exists in our system, ' +
        'you will recieve an email with a code to sign in.'
        
        let inp = document.createElement('input')
        inp.id = 'code'
        inp.placeholder = 'Code'
        inp.addEventListener('keyup', (event) => {
            if (event.key == 'Enter') {
                this.requestAuthentication()   
            }
        })
        
        let iVal = document.createElement('div')
        iVal.id = 'fnt-valid'
        iVal.style.height = '20px'

        fieldset.appendChild(legend)
        fieldset.appendChild(info)
        fieldset.appendChild(inp)
        fieldset.appendChild(iVal)

        return this.generateFormContainer([fieldset])
    }

    requestAuthentication()
    {
        let form = this.enterCodeForm
        if (form.isValid())
        {
            this.showModal(this.ProcessingContainer, false)
            this.api.GET_Authentication(form.code)
            .then((res) => {
                if(res.errors.length > 0) {
                    this.showModal(this.ErrorContainer(res.errors[0]),false)
                    setTimeout(()=>{
                        this.showModal(this.EnterCodeContainer)
                    },3000)
                } else {
                    location.reload()
                }
            })
        }
    }

    get enterCodeForm()
    {
        let code = this.getInputValue('code')

        let isValid = () => {
            let result = true
            if (!this.isValidCode(code)) {
                result = false
                if (document.getElementById('fnt-valid').childElementCount === 0)
                {
                    this.showErrorMessage('Invalid Code')
                }
            }
            return result
        }

        return {
            'code': code,
            'isValid': isValid
        }
    }

    //#endregion

    //#region Utility functions

    getInputValue(id)
    {
        let inputElement = document.getElementById(id)
        if (inputElement == 'undefined') return null
        return inputElement.value
    }

    isValidEmail(email)
    {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ) !== null
    }

    isValidCode(code)
    {
        let result = true
        if (code.length !== 4) {
            result = false
        } else {
            for(let i=0; i < code.length; i++)
            {
                let parsed = parseInt(code[i])
                if (isNaN(parsed)) result = false
            }
        }
        return result
    }

    generateFormContainer(childElements = [])
    {
        let stopEvent = (event) => { event.stopPropagation() }
        let container = document.createElement('div')
        container.classList.add('fnt-modal')
        container.addEventListener('click',stopEvent)
        childElements.forEach((child) => {
            container.appendChild(child)
        })
        return container
    }

    //#endregion

    //#region User Feedback

    get ProcessingContainer()
    {
        let ele = document.createElement('div')
        ele.innerText = 'Processing...'        
        return this.generateFormContainer([ele])
    }

    ErrorContainer(err)
    {
        let ele = document.createElement('div')
        ele.innerText = err
        ele.classList.add('fnt-err')
        return this.generateFormContainer([ele])
    }

    showErrorMessage(message, timeout = 2000)
    {
        let parent = document.getElementById('fnt-valid')
        let msg = document.createElement('div')
        msg.classList.add('fnt-err')
        msg.innerText = message
        msg.addEventListener('click', () => { msg.remove() })
        setTimeout(() => { msg.remove() },timeout)            
        parent.appendChild(msg)
    }

    //#region Form Modal

    /**
     * Display an element as a modal.
     * @param {Element} container The element to display as a modal.
     * @param {boolean} allowClose True if the user should be able
     * to close the modal by clicking outside the modal.
     */
    showModal(container, allowClose = true)
    {
        this.deleteModal()
        let body = document.querySelector("body")
        let modal = this.createModal(container, allowClose)
        body.appendChild(modal)
    }

    deleteModal()
    {
        document.getElementById('fnt-modal-bg')?.remove()
    }

    createModal(child, allowClose)
    {
        let modal = document.createElement('div')
        modal.id = 'fnt-modal-bg'
        modal.appendChild(child)

        if (allowClose) {
            modal.addEventListener('click', () => { this.deleteModal() })
        }

        return modal
    }

    //#endregion
    
    //#endregion
}