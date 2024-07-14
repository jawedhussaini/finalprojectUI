import { useContext, useEffect, useState } from "react";
import { GloblaContext } from "../../context";
import Loader from "../loader";
import Personal from "./details/Personal";
import Mesurs from "./details/Mesurs";
import Photos from "./details/Photos";
import LineChart from "../charts/LineChart";
import FichMesurs from "./details/FichMeausur";
import TrainingLoads from "./details/TrainingLoad";
import Service from "./details/Service";

function UserModal({ graphData, table, data, servey }) {
  const { setUserDetailsModel, loaders } = useContext(GloblaContext);
  const [firstColum, setfirstcolum] = useState([]);
  const [secondColum, setsecondColum] = useState([]);
  const [thirdColum, setthirdColum] = useState([]);

  const tableData = data?.data?.attributes;




  const tableNames = {
    table1: "BILAN MENSUEL PACK VIP PREMIUM",
    table2: "BILAN MENSUEL PACK STARTER",
    table3: "BILAN MENSUEL PACK NUTRITION",
    table4: "FICHE PACK STARTER",
    table5: "FICHE PACK VIP PREMIUM",
    table6: "PACK TRAINING ATHLÈTE",
    table7: "FICHE PACK SPÉCIFIQUE NUTRITION",
    table8: "CHECK UP HEBDOMADAIRE PACK VIP",
    table9: "CHECK UP BI-MENSUEL PACK STARTE"
  };

  useEffect(() => {
    if (
      data &&
      data.data &&
      data.data.attributes &&
      data.data.attributes.service
    ) {
      const arr = Object.entries(data.data.attributes.service);
      const updatedArray = arr.map((subObject) => {
        const filteredEntries = Object.entries(subObject).filter(
          ([key, value]) => key !== "measure" && key !== "PoidsAJeun"
        );
        return Object.fromEntries(filteredEntries);
      });
      const first = [];
      const second = [];
      const third = [];
      updatedArray.forEach((element, index) => {
        if (index % 3 === 0) {
          first.push(element);
        } else if (index % 3 === 1) {
          second.push(element);
        } else {
          third.push(element);
        }
      });
      setfirstcolum(first);
      setsecondColum(second);
      setthirdColum(third);
     
    }
  }, [data]);

  return (
    <>
      <div className="userModel">
        <div className="outer" onClick={() => setUserDetailsModel(false)}>
          <div className="inner">
            <label className="closeLable">Close</label>
          </div>
        </div>

        {loaders ? (
          <Loader />
        ) : (
          <div className="userModelContainer">
            <h1 className="title h1Class">{table}</h1>

            <div className="CartsContainer">
              <div>
                {tableData!== null && <Personal nom={tableData?.Nom}
                      prenom={tableData?.Prenom}
                      email={tableData?.Email} prof={tableData?.service?.Photo?.["De Profil"]} Poidsàjeun={tableData?.service?.["Poids à jeun"]}  personal={data?.data?.attributes?.service?.Personal}/>  }

                {firstColum.length !== 0 &&
                  firstColum.map((item, index) =>
                    item[0] === "measure" ||
                    item[0] === "measureFitche" ||
                    item[0] === "Poids à jeun" ||
                    item[0] === "PoidsAJeun" ||
                    item[0] === "Photo" ? null : (
                      <Service key={index} data={firstColum[index]} />
                    )
                  )}
                {(table===tableNames.table1 || table===tableNames.table2 || table===tableNames.table3 ||table===tableNames.table4 ||table===tableNames.table5 ||table===tableNames.table6 ||table===tableNames.table7  ) ? <Photos data={data?.data?.attributes?.service?.Photo} /> : null}
              </div>
              <div>
                {secondColum.length !== 0 && tableData?.service?.measure && (
                  <LineChart
                    data={graphData}
                    row={tableData?.Email}
                    servey={table}
                  />
                )}

                {thirdColum.length !== 0 && 
                  thirdColum.map((item, index) =>
                    item[0] === "measure" ||
                    item[0] === "PoidsAJeun" ||
                    item[0] === "Poids à jeun" ||
                    item[0] === "measureFitche" ||
                    item[0] === "Photo" ? null : (
                      <Service key={index} data={thirdColum[index]} />
                    )
                  )}
                  {
                    (table===tableNames.table1 || table===tableNames.table2 || table===tableNames.table3) && <TrainingLoads Email={tableData?.Email} createdAt={tableData?.createdAt}/> 
                  }
              </div>

              <div>
                  {secondColum.length !== 0 && tableData?.service?.measure && (
                  <Mesurs
                    data={graphData}
                    row={data?.data?.attributes}
                    servey={table}
                  />
                )}
                {secondColum.length !== 0 && tableData?.service?.measureFitche && (
                  <FichMesurs
                    data={data?.data?.attributes?.service?.measureFitche}
                 
                  />
                )}
                {secondColum.length !== 0 &&
                  secondColum.map((item, index) =>
                    item[0] === "measure" ||
                    item[0] === "PoidsAJeun" ||
                    item[0] === "Poids à jeun" ||
                    item[0] === "measureFitche" ||
                    item[0] === "Photo" ? null : (
                      <Service key={index} data={secondColum[index]} />
                    )
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserModal;
