export function  setModalStyles (height:string)  {
    const modalContent = document.querySelector('.MainModal >div>.ant-modal-content') as HTMLElement;
    
    if (modalContent) {
        modalContent.style.height = height;
        console.log('==Executed==')
    // Add any other styles you want to apply
    // modalContent.style.backgroundColor = 'white'; // Example
    // modalContent.style.padding = '20px'; // Example
    } else {
        console.error('Modal content element not found');
    }
}