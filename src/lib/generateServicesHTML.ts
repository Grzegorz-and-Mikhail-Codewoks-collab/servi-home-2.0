export default function generateServicesHTML(services: any) {
  return services
    .map((service: any) => {
      if (service.title === 'Revitalize Your Rugs') {
        return `
      <div>
        <strong>${service.title}</strong>
        <p>Rug Measure: ${service.rugmeasure}</p>
        <p>Rug Condition: ${service.rugcondition}</p>
        
      </div>
    `;
      } else if (service.title === 'Renew Your Furniture') {
        return `

        <div>
        <strong>${service.title}</strong>

        <p>Measure: ${service.measure}</p>
        <p>Condition: ${service.condition}</p>


        
        </div>
        
        `;
      } else if (service.title === 'Elevate Your Tabletops') {
        return `

        <div>
        <strong>${service.title}</strong>
        <p>Measure: ${service.servicetable}</p>

        </div>
        
        `;
      }
    })
    .join('');
}
