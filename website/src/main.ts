import { LitService } from './lit/lit.service';
import { PasswordEncryption } from './password_encryption';
import { validateForm, displayErrors, SubscriptionFormData } from './form';

export class MainController {

    lit: any;
    password: any;

    constructor() {

        this.init()
    }

    init() {

        this.lit = new LitService(this);
        this.lit.init();
        this.password = new PasswordEncryption();

        this.armForm();
    }

    onFormSubmit( event: Event) {

        event.preventDefault();
  
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        
        const data: SubscriptionFormData = {
            subscribed: formData.get('subscribed') === "on",
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            address: formData.get('address') as string,
            password: formData.get('password') as string,
            
        };
        
        const errors = validateForm(data);
        
        if (errors.length > 0) {
            displayErrors(errors);
            return;
        }
        
        console.log(data);

    }

    armForm() {

        const form = document.getElementById('subscribe') as HTMLFormElement;
        form.addEventListener('submit', this.onFormSubmit)
    }
}