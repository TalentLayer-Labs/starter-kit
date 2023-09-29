import React, { useState } from 'react'
import { CreateSpaceProps } from '../../modules/MultiDomain/types';
import { useCreateSpaceMutation } from '../../modules/MultiDomain/hooks/UseCreateSpaceMutation';
import { generateSubdomainPrefix } from '../../modules/MultiDomain/utils';

export default function Onboarding() {
  const [createSpace, setCreateSpace] = useState<CreateSpaceProps>({ name: "", subdomain: "", primaryColor: "", secondaryColor: "" });
  const [createSpaceResponse, setCreateSpaceResponse] = useState("No response yet");
  const createSpaceMutation = useCreateSpaceMutation();

  const handleCreateSpace = async (e: any) => {
    e.preventDefault();
    try {
      const subdomainPrefix = generateSubdomainPrefix(createSpace.name);
      const subdomain = `${subdomainPrefix}.localhost:3000`;
      const result = await createSpaceMutation.mutateAsync({ ...createSpace, subdomain });
      setCreateSpaceResponse(`${result.name} space got created` || 'No response yet');
      window.location.href = `http://${subdomain}/admin`;

    } catch (error) {
      console.error('Error creating space:', error);
      setCreateSpaceResponse('Failed to create space');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCreateSpace(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const subdomainPrefix = generateSubdomainPrefix(createSpace.name);
  const subdomain = `${subdomainPrefix}.localhost:3000`;

  return (
    <div>
      <form onSubmit={handleCreateSpace}>
        <label>
          Name:
          <input type="text" name="name" value={createSpace.name} onChange={handleInputChange} />
        </label>
        <label>
          Subdomain:
          <input type="text" name="subdomain" value={subdomain} disabled />
        </label>
        <label>
          Primary Color:
          <input type="text" name="primaryColor" value={createSpace.primaryColor} onChange={handleInputChange} />
        </label>
        <label>
          Secondary Color:
          <input type="text" name="secondaryColor" value={createSpace.secondaryColor} onChange={handleInputChange} />
        </label>
        <button type="submit">Create Space</button>
      </form>
      <p>{createSpaceResponse}</p>
    </div>
  )
}