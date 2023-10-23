export function generateSubdomainPrefix(name: string): string {
  // Remove any non-alphanumeric characters and replace spaces with hyphens
  const alphanumericName = name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '-');
  // Convert to lowercase and truncate to 63 characters (the maximum length for a subdomain)
  const subdomainPrefix = alphanumericName.toLowerCase().substring(0, 63);
  return subdomainPrefix;
}

export function getDomainPrefix(domain: string, apexName: string): React.ReactNode {
  return domain.slice(0, domain.length - apexName.length - 1);
}
