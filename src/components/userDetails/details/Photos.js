import { Card, Col } from "antd";
import { useContext, useEffect, useState } from "react";
import { GloblaContext } from "../../../context";
import ImageModal from '../ImageModal'

function Photos(data) {
   const { imageModal, setImageModal } = useContext(GloblaContext);
   const [imgeForModal, setImageForModal] = useState(null);
   const [photos,setphotos]=useState([])

  
     useEffect(() => {

 if (data?.data) {
        const arr = Object.entries(data?.data);
        setphotos(arr)

     

  }}, [data]);
 
  return (
    <>
         
      <Col span={24} md={600} className="mb-24">
       

        <Card
          bordered={false}
          className="cartClass"
        >
         <h1 className="font-semibold bt-20 h1Class">Photos:</h1>
         <div className="PhotosContainer">
          {
            photos.map((element)=>(
            <div className="Photos" key={element[0]}>
                <h1 className="h1Class">{element[0]}</h1>
                <div ><img className="photo" onClick={()=>{setImageForModal(`${element[1]}`);setImageModal(true)}} alt="img" src={`${element[1]}`}/></div>
            </div>
            ))
          }
           
          
          
         </div>
         {imageModal && <ImageModal image={imgeForModal}/>}
       
        </Card>
      </Col>
    </>
  );
}

export default Photos;
