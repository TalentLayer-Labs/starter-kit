import React, { useState } from 'react';
import DomainConfiguration from '../../../modules/MultiDomain/components/DomainConfiguration';
import { useDomainStatus } from '../../../modules/MultiDomain/hooks/UseDomainStatus';
import { CreateSpaceProps } from '../../../modules/MultiDomain/types';

export default function CustomDomain() {
  const [customDomain, setCustomDomain] = useState('');
  const [subdomain, setSubdomain] = useState('');

  const [submitCustomDomain, setSubmitCustomDomain] = useState(true);

  const { status, loading } = useDomainStatus({ domain: "solarfund.wtf" });

  const handleCreateSpace = async () => {
    try {
      const data: CreateSpaceProps = { name: "Lens", subDomain: "lens", primaryColor: "green", secondaryColor: "white" }

      const response = await fetch('/api/domain/create-space', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send data');
      }

      console.log('Data sent successfully');
    } catch (error) {
      console.error('Failed to send data:', error);
    }

  };

  const handleSubmitCustomDomain = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Handle custom domain submission
    console.log('Custom domain submitted:', customDomain);
    setSubmitCustomDomain(true);

  };

  const handleSubmitSubdomain = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Handle subdomain submission
    console.log('Subdomain submitted:', subdomain);

  };

  return (
    <div>
      <h1>Custom Domain Form</h1>
      <form onSubmit={handleSubmitCustomDomain}>
        <label htmlFor='customDomain'>Enter your own domain:</label>
        <input
          type='text'
          id='customDomain'
          name='customDomain'
          onChange={event => setCustomDomain(event.currentTarget.value)}
        />
        <button type='submit'>Submit</button>
      </form>

      <h1>Subdomain Form</h1>
      <form onSubmit={handleSubmitSubdomain}>
        <label htmlFor='subdomain'>Enter a subdomain:</label>
        <input
          type='text'
          id='subdomain'
          name='subdomain'
          onChange={event => setSubdomain(event.currentTarget.value)}
        />
        <button type='submit'>Submit</button>
      </form>
      <button onClick={handleCreateSpace}>Create Test Space</button>

      {submitCustomDomain ? <DomainConfiguration domain={customDomain} /> : null}

    </div>
  );
}
