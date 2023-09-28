import React, { useState } from 'react';
import DomainConfiguration from '../../../modules/MultiDomain/components/DomainConfiguration';
import { useDomainStatus } from '../../../modules/MultiDomain/hooks/UseDomainStatus';
import { CreateSpaceProps, UpdateSpace } from '../../../modules/MultiDomain/types';
import { useMutation, useQueryClient } from 'react-query';
import { useCreateSpaceMutation } from '../../../modules/MultiDomain/hooks/UseCreateSpaceMutation';
import { useUpdateSpaceDomain } from '../../../modules/MultiDomain/hooks/UseUpdateSpaceDomain';
import { generateSubdomainPrefix } from '../../../modules/MultiDomain/utils';
import { useDeleteSpaceMutation } from '../../../modules/MultiDomain/hooks/UseDeleteSpaceMutation';
import { useUpdateSpace } from '../../../modules/MultiDomain/hooks/UseUpdateSpace';

export default function AdminDashboard() {
  const [customDomain, setCustomDomain] = useState("solarfund.wtf");

  const { status, loading } = useDomainStatus({ domain: "solarfund.wtf" });
  const queryClient = useQueryClient();

  // ----------------- create space -----------------
  const [createSpace, setCreateSpace] = useState<CreateSpaceProps>({ name: "testingFR", subDomain: "testing", primaryColor: "green", secondaryColor: "white" });
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
        customDomain: "creedscode.cc", subDomain: "testing.solarfund.wtf"
      });
    } catch (error) {
      console.error('Error updating domain:', error);
    }
  }


  // ----------------- delete space -----------------
  const { mutate: deleteSpace, isLoading: isLoadingDelete
  } = useDeleteSpaceMutation();

  const handleDeleteClick = () => {
    const subDomain = 'testing.solarfund.wtf'; // Replace with the ID of the space to delete
    deleteSpace(subDomain);
  };


  // ----------------- subdomain -----------------
  const [name, setName] = useState('');
  const [subdomainPrefix, setSubdomainPrefix] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setSubdomainPrefix(generateSubdomainPrefix(event.target.value));
  };


  // ----------------- update space -----------------
  const [spaceUpdateData, setSpaceUpdateData] = useState({ subDomain: '', name: '' });
  const updateSpaceMutation = useUpdateSpace();

  const handleUpdateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSpaceUpdateData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateSpaceMutation.mutate(spaceUpdateData as UpdateSpace);
  };


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

      <form onSubmit={handleUpdateSubmit}>
        <label>
          ID:
          <input type="text" name="subDomain" value={spaceUpdateData.subDomain} onChange={handleUpdateInputChange} />
        </label>
        <label>
          Name:
          <input type="text" name="name" value={spaceUpdateData.name} onChange={handleUpdateInputChange} />
        </label>
        <button type="submit">Update Space</button>
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

      <div>
        <h1>Prefix</h1>
        <label htmlFor="name-input">Enter a name:</label>
        <input id="name-input" type="text" value={name} onChange={handleNameChange} />
        <p>Subdomain prefix: {subdomainPrefix}</p>
      </div>

      <button onClick={handleDeleteClick} disabled={isLoadingDelete}>
        {isLoadingDelete ? 'Deleting...' : 'Delete Space'}
      </button>

      <DomainConfiguration domain={customDomain} />

    </div>
  );
}
