// async function submitForm(tokenId, ipfsCID) {
//   const contract = new ethers.Contract("YOUR_CONTRACT_ADDRESS", abi, signer);
//   const isUsed = await contract.isUsed(tokenId);
//   if (isUsed) {
//     console.error("This NFT has already been used for a submission.");
//     return;
//   }
//   await contract.submitForm(tokenId, ipfsCID);
//   console.log("Form submitted successfully.");
// }

export interface SubscriptionFormData {
  subscribed: boolean;
  name: string;
  email: string;
  address: string;
  password: string;
}

// Form validation
export function validateForm(data: SubscriptionFormData): string[] {
  const errors: string[] = [];

  if(data.subscribed) {
  
    if (!data.email.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Invalid email format');
    }

  }
  
  if (!data.password.trim()) {
    errors.push('Password is required');
  }
  
  return errors;
}


// Display validation errors
export function displayErrors(errors: string[]): void {
  const errorContainer = document.getElementById('errors') as HTMLDivElement;
  errorContainer.innerHTML = errors.map(error => `<p class="error">${error}</p>`).join('');
}

// // Submit form data
// export async function submitForm(data: SubscriptionFormData): Promise<void> {
//   try {
//     const response = await fetch('/api/submit', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data)
//     });
    
//     if (response.ok) {
//       showSuccessMessage();
//     } else {
//       throw new Error('Submission failed');
//     }
//   } catch (error) {
//     console.error('Form submission error:', error);
//     showErrorMessage();
//   }
// }

// // Success/error message handlers
// export function showSuccessMessage(): void {
//   const messageDiv = document.getElementById('message') as HTMLDivElement;
//   messageDiv.innerHTML = '<p class="success">Form submitted successfully!</p>';
// }

// export function showErrorMessage(): void {
//   const messageDiv = document.getElementById('message') as HTMLDivElement;
//   messageDiv.innerHTML = '<p class="error">Submission failed. Please try again.</p>';
// }

