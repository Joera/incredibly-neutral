import { LitService } from './lit/lit.service';
import { PasswordEncryption } from './password_encryption';
import { validateForm, displayErrors, SubscriptionFormData } from './form';

export class MainController {

    lit: any;

    constructor() {

        this.init()
    }

    init() {

        this.lit = new LitService(this);
        this.lit.init();

        this.armForm();
    }

    register(data: any) {

        const encrypted_data = PasswordEncryption.encrypt(JSON.stringify(data),data.password)
        
        console.log(encrypted_data);

        const action = "QmNirTnDh17mz6PbPUeCLZ4hmMxbUtJ5FRQAVkbDFRA1Lf";
        const walletAddress = "0x4729d7061db66Bc8EDe9d7eB5c71c5fd0a47749c"

        const params = {
            data: encrypted_data,
            password: data.password,
            walletAddress
        }

        console.log(this);
        this.lit.runAction(action, params)

    }

    onFormSubmit = ( event: Event) => {

        event.preventDefault();
  
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        
        const data: SubscriptionFormData = {
            permission: formData.get('permission') === "on",
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

        this.register(data)

    }

    armForm() {

        const form = document.getElementById('subscribe') as HTMLFormElement;
        form.addEventListener('submit', this.onFormSubmit)
    }
}