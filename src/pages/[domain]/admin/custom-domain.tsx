import React, { useState } from 'react';
import DomainConfiguration from '../../../modules/MultiDomain/components/DomainConfiguration';
import { useDomainStatus } from '../../../modules/MultiDomain/hooks/UseDomainStatus';
import { CreateSpaceProps } from '../../../modules/MultiDomain/types';
import { useMutation, useQueryClient } from 'react-query';
import { useCreateSpaceMutation } from '../../../modules/MultiDomain/hooks/UseCreateSpaceMutation';
import { useUpdateSpaceDomain } from '../../../modules/MultiDomain/hooks/UseUpdateSpaceDomain';

export default function CustomDomain() {
  const [customDomain, setCustomDomain] = useState('');


  const { status, loading } = useDomainStatus({ domain: "solarfund.wtf" });
  const queryClient = useQueryClient();

  // ----------------- create space -----------------
  const [createSpace, setCreateSpace] = useState<CreateSpaceProps>({ name: "testing", subDomain: "testing", primaryColor: "green", secondaryColor: "white" });
  const [createSpaceResponse, setCreateSpaceResponse] = useState("No response yet");
  const createSpaceMutation = useCreateSpaceMutation();
  const handleCreateSpace = async () => {
    try {
      const result = await createSpaceMutation.mutateAsync(createSpace);
      setCreateSpaceResponse(`${result.name} space got created` || 'No response yet');
    } catch (error) {
      console.error('Error creating space:', error);
      setCreateSpaceResponse('Failed to create space');
    }
  };


  // ----------------- update domain -----------------
  const updateSpaceDomainMutation = useUpdateSpaceDomain();
  const handleUpdateDomainClick = async () => {
    try {
      updateSpaceDomainMutation.mutate({
        customDomain: null, id: "651212378a884e001c148a5a"
      });
    } catch (error) {
      console.error('Error updating domain:', error);
    }
  }

  return (
    <div>
      <h1>Custom Domain Form</h1>
      <form onSubmit={handleUpdateDomainClick}>
        <label htmlFor='customDomain'>Enter your own domain:</label>
        <input
          type='text'
          id='customDomain'
          name='customDomain'
          onChange={event => setCustomDomain(event.currentTarget.value)}
        />
        <button type='submit'>Submit</button>
      </form>

      <div>
        <button onClick={handleCreateSpace}>Create Test Space</button>
        <p>{createSpaceResponse}</p>
      </div>

      <div>
        <button onClick={handleUpdateDomainClick}>
          Update Space Domain
        </button>
      </div>

      <DomainConfiguration domain={customDomain} />

    </div>
  );
}
