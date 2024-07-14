import { Col, } from "antd";


function FichMesurs(data) {
  



  return (
    <>
      <Col span={24} md={600} className="mb-24 primaryCol">
      
       
          <h1 className="font-semibold center  m-0 bt-20">Inetail Mesurments</h1>
         
          <div className="tableContainer">
            
  

           
              <table className="table">
                <tbody>
                  <tr>
                    <td>Mollets D</td>
                    <td>{data?.data?.molletsD}</td>
                  
                    <td>Mollets G</td>
                    <td>{data?.data?.molletsG}</td>
               
                  </tr>
                    <tr>
                    <td>Cuisses D</td>
                    <td>{data?.data?.cuissesD}</td>
                  
                    <td>Cuisses G</td>
                    <td>{data?.data?.cuissesG}</td>
               
                  </tr>
                  <tr>
                    <td>Fessiers</td>
                    <td>{data?.data?.fessiers}</td>
                 
                    <td>Taille</td>
                    <td>{data?.data?.taille}</td>
                  
                  </tr>
                  <tr>
                    <td>Nombril</td>
                    <td>{data?.data?.nombril}</td>
              
                    <td>Pectoraux (Poitrine)</td>
                    <td>{data?.data?.pectorauxPoitrine}</td>
                
                  </tr>
                     <tr>
                    <td>Bras D</td>
                    <td>{data?.data?.brasD}</td>
                  
                    <td>Bras G</td>
                    <td>{data?.data?.brasG}</td>
               
                  </tr>
                  <tr>
                    <td>Épaules</td>
                    <td>{data?.data?.epaules}</td>
                  
                    <td></td>
                    <td></td>
                   
                  </tr>
                </tbody>
              </table>
          
          </div>
       
      </Col>
    </>
  );
}

export default FichMesurs;