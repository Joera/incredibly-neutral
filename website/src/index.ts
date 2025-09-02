
import { MainController } from './main';
import { verify } from './verify' 

const devNetterII = "0x4729d7061db66Bc8EDe9d7eB5c71c5fd0a47749c";

const toggleComponent = (tabEl: HTMLElement,componentId: string) => {
    document.querySelectorAll('#tabs ul li').forEach(tab => {
        tab.classList.remove('active');
    });
    tabEl.classList.add('active');
    const componentTab = document.getElementById(componentId);
    if (componentTab) {
        componentTab.style.display === 'flex';
        const allTabs : HTMLElement[] = [].slice.call(document.querySelectorAll('.component_tab'));
        allTabs.forEach(tab  => {
            tab.style.display = 'none';
        });
        componentTab.style.display = 'flex';
    }
}

window.addEventListener('load', function() {
    const params = new URLSearchParams(location.search);
    const uid = params.get('uid') || "";
    if (verify(uid, devNetterII)) {
        
        const tab = this.document.querySelector("#tabs ul li:first-of-type") as HTMLElement;
        if (tab) {
            toggleComponent(tab, "component_tab_contact")
        }

        const main = new MainController();

        // const form = document.getElementById('subscribe') as HTMLFormElement;
        // form.addEventListener('submit', onFormSubmit)

    } else {

    }

});


