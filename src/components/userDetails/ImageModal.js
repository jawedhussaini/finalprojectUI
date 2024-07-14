/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useContext,} from "react";

import { GloblaContext } from "../../context";


function ImageModal(data) {

    const { setImageModal } = useContext(GloblaContext);
  return (
    <>
      <div className="imageModalContainer">
         
        <div class="outer" onClick={()=>setImageModal(false)}>
          <div class="inner">
            <label className="closeLable">Close</label>
          </div>
        </div>
        <section className="imageInmodel">
               
                 <img src={data?.image} alt="img" className="image" />
          
        
        </section>
      </div>
    </>
  );
}

export default ImageModal;
