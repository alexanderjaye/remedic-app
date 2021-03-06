interface NHSQuery {
  filter: string;
  top: number;
  skip: number;
  count: boolean;
}
const key = process.env.REACT_APP_NHS_URL as string;

/**
 * getNHSServices => Promise<any>
 * @param postcode 'SW1A 1AA'
 */

export async function getNHSServices(postcode: string): Promise<any> {
  const query: NHSQuery = {
    filter:
      "(OrganisationTypeID eq 'DEN') or (OrganisationTypeID eq 'GPB') or (OrganisationTypeID eq 'GPP') or (OrganisationTypeID eq 'HOS') or (OrganisationTypeID eq 'OPT') or (OrganisationTypeID eq 'PHA')",
    top: 25,
    skip: 0,
    count: true,
  };

  const encodedPostcode = encodeURI(postcode);

  const response = await fetch(
    `https://api.nhs.uk/service-search/search-postcode-or-place?api-version=1&search=${encodedPostcode}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "subscription-key": `${key}`,
      },
      body: JSON.stringify(query),
    }
  );

  const { value } = await response.json();
  if (response.status < 400 && value) return value;
  else return Promise.reject(new Error("Invalid Query"));
}

/**
 * @param searchTerm 'Acoustic neuroma'
 */
export async function getNHSTermInformation(searchTerm: string) {
  const formattedSearchTerm: string = searchTerm.trim().split(" ").join("-");

  const response = await fetch(
    `https://api.nhs.uk/conditions/${formattedSearchTerm}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "subscription-key": `${key}`,
      },
    }
  );

  const data = await response.json();
  if (response.status < 400 && data) return data;
  else return Promise.reject(new Error("Invalid Query"));
}
