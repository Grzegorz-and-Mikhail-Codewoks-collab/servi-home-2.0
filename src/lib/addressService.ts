const districts =require('./berlinDistricts.json')

export const addressAutocomplete = async (address :string) : Promise<any[]> => {
  const url = 'https://api.geoapify.com/v1/geocode/autocomplete?text='
  const apiKey='048f831ab8a340ba95106ed6ced93856'
  const response = await fetch(`${url}${address}&apiKey=${apiKey}`)
  const body:any = await response.json()
  
  const addressList: any[] = body.features.map((adr: any) => {
    return adr
  });
  
  return addressList
}

export const getDistrictsOfBerlin = () :string[] => {
  return districts.districts
}


