

const toggleComponent = (tabEl,componentId) => {
    document.querySelectorAll('#tabs ul li').forEach(tab => {
        tab.classList.remove('active');
    });
    tabEl.classList.add('active');
    const componentTab = document.getElementById(componentId);
    const isVisible = componentTab.style.display === 'flex';
    const allTabs = document.querySelectorAll('.component_tab');
    allTabs.forEach(tab => {
        tab.style.display = 'none';
    });
    componentTab.style.display = 'flex';
}


window.addEventListener('load', function() {
    const params = new URLSearchParams(location.search);
    
    // Get all params as an object
    const allParams = Object.fromEntries(params);
    console.log(allParams);
    
    // Or get individual params
    const uid = params.get('uid');
    if (uid) {
        // Do something with the parameter
       toggleComponent(this.document.querySelector('#tabs ul li:first-of-type'), 'component_tab_contact') 
    } else {
        toggleComponent(this.document.querySelector('#tabs ul li:last-child'), 'component_tab_info') 
    }
});