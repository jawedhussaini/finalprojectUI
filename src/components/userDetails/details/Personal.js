import { Card, Col } from "antd";

import { MdOutlineMail } from "react-icons/md";

import { useEffect, useState } from "react";

function Personal(data) {
    const [personal,setpersonal]=useState([])
     useEffect(() => {

 if (data?.personal) {
        const arr = Object.entries(data?.personal);
      setpersonal(arr)
   
     

  }}, [data]);

 
  return (
    <>
      <Col span={24} md={600} className="mb-24">
        <Card bordered={false} className="carts cartClass" >
          {( data && data?.prof &&
          <div className="center">
            <img className="profile" alt="Img" src={`${data.prof}`} />
          </div> 
          )
        }
        
          <h1 className="font-semibold center m-0 bt-20 h1Class">
            {data?.nom} {data?.prenom}
          </h1>
      

        
          <table className="cartTable center">
            <tbody>
            

              <tr>
                <td className="cartTableTD">
                  <div className="profLogo">
                    <MdOutlineMail size={15} color="black" />
                  </div>
                </td>
                <td className="cartTableTD">
                  <h4 className="profileLogoText answer">{data?.email}</h4>
                </td>
              </tr>
            

                 </tbody>
          </table>
          {data?.Poidsàjeun ?  <div>
              <h3 className="question">Poids à jeun</h3>
              <p className="answer">{data?.Poidsàjeun}</p>
            </div> : null }
      {
       data?.personal ?(
           <div>
            {personal.map((items)=>(
             <div key={items[0]}>
              <h3 className="question">{items[0]}</h3>
              <p className="answer">{items[1]}</p>
            </div> 
            ))}
       </div>
        ) : null
      }
      
        </Card>
      </Col>
    </>
  );
}

export default Personal;
