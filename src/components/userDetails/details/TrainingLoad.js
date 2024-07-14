import { Dropdown, Space, Col, DatePicker, Menu } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import Loader from "../../loader";

function TrainingLoads(datas) {
  const [pickYear, setPickYear] = useState(new Date(datas?.createdAt).getFullYear());
  const [day, setDay] = useState(null);
  const [mounth, setMountt] = useState("01");
  const [listOfLoads, setListOfloads] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState([]);
  const [loadTrsinigHeader, setLoadTrainigHeader] = useState(
    "Click To Load Trains"
  );
  const [loader, setloader] = useState(false);
  const [allData, setAllData] = useState();
  const API=process.env.REACT_APP_TRAINIGLOADS_API
  const mounths = [
    { key: "01", value: "J" },
    { key: "02", value: "F" },
    { key: "03", value: "M" },
    { key: "04", value: "A" },
    { key: "05", value: "M" },
    { key: "06", value: "J" },
    { key: "07", value: "J" },
    { key: "08", value: "A" },
    { key: "09", value: "S" },
    { key: "10", value: "O" },
    { key: "11", value: "N" },
    { key: "12", value: "D" },
  ];
  const daysFistRow = [
    { key: "01", value: "1" },
    { key: "02", value: "2" },
    { key: "03", value: "3" },
    { key: "04", value: "4" },
    { key: "05", value: "5" },
    { key: "06", value: "6" },
    { key: "07", value: "7" },
    { key: "08", value: "8" },
    { key: "09", value: "9" },
    { key: "10", value: "10" },
    { key: "11", value: "11" },
    { key: "12", value: "12" },
    { key: "13", value: "13" },
    { key: "14", value: "14" },
    { key: "15", value: "15" },
  ];
  const daysSecondRow = [
    { key: "16", value: "16" },
    { key: "17", value: "17" },
    { key: "18", value: "18" },
    { key: "19", value: "19" },
    { key: "20", value: "20" },
    { key: "21", value: "21" },
    { key: "22", value: "22" },
    { key: "23", value: "23" },
    { key: "24", value: "24" },
    { key: "25", value: "25" },
    { key: "26", value: "26" },
    { key: "27", value: "27" },
    { key: "28", value: "28" },
    { key: "29", value: "29" },
    { key: "30", value: "30" },
  ];

  const getData = async (day) => {
    setSelectedTrain([])
    setListOfloads([])
    setLoadTrainigHeader("Click To Load Trains")
    setDay(day);

    const startDay =
      new Date(pickYear ? dayjs(new Date(pickYear, 0)) : null).getFullYear() +
      "-" +
      mounth +
      "-" +
      day +
      "T00:00:00.000Z";
    const endDate =
      new Date(pickYear ? dayjs(new Date(pickYear, 0)) : null).getFullYear() +
      "-" +
      mounth +
      "-" +
      day +
      "T23:59:59.999Z";

    try {
      setloader(true);
      const response =
        await fetch(`${API}?user.email=${datas?.Email}&created_at_gt=${startDay}&created_at_lt=${endDate}
        
`);
      setloader(false);
      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.json();
   
      setAllData(data);

      const dropDown = data.map((items) => ({
        label: items.exercise.name.trim(),
        key: items.exercise.name.trim(),
      }));
      const uniqueDropDown = dropDown.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t.label === item.label)
      );
      setListOfloads(uniqueDropDown);
    } catch (err) {
      console.log(err);
    }
  };

  const training = (label) => {
    setLoadTrainigHeader(label);
    setSelectedTrain(
      allData.filter((item) => item.exercise.name.trim() === label)
    );
  };

 

  return  (
    <>
      <Col span={24} md={600} className="primaryCol trainingLoadsCol">
        <h1 className="font-semibold center m-0 bt-20">Training Loads</h1>
        {
          loader ? <div className="smallLoaderTainigLoads"></div> :
          <Dropdown
          trigger={["click"]}
          overlay={
            <Menu>
              {listOfLoads.map((item) => (
                <Menu.Item key={item.key} onClick={() => training(item.label)}>
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <Space className="center TrainsHearder">{loadTrsinigHeader}</Space>
        </Dropdown>
        }
        
        <div className="center trainingLoadsYear">
          {
            
          }
          <DatePicker
            placeholder="select Year"
            className="datepicker year"
            picker="year"
            value={pickYear ? dayjs(new Date(pickYear, 0)) : null}
            onChange={(date) => setPickYear(date ? date.year() : null)}
          />
        </div>
        <div className="months center">
          {mounths.map((items) => (
            <span
              className={mounth === items.key ? "selectedMounth" : null}
              onClick={() => setMountt(items.key)}
            >
              {items.value}
            </span>
          ))}
        </div>
        <div className="daysContainer center">
          <table className="daysTable">
            <tbody>
              <tr>
                {daysFistRow.map((items) => (
                  <td className="days">
                    <span
                      className={
                        day === items.key ? "daysSpan selectedDay" : "daysSpan"
                      }
                      onClick={() => getData(items.key)}
                    >
                      {items.value}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                {daysSecondRow.map((items) => (
                  <td className="days">
                    <span
                      className={
                        day === items.key ? "daysSpan selectedDay" : "daysSpan"
                      }
                      onClick={() => getData(items.key)}
                    >
                      {items.value}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="tableContainer">
          <table className="table">
            <tbody>
              <tr>
                <th>Number Of Sets</th>
                <th>Loads</th>
               
              </tr>

              {selectedTrain.map((item, index) => (
                <tr key={index}>
                  <td>set{index + 1}</td>
                  <td className="breackLoads">{item.meta}</td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Col>
    </>
  );
}

export default TrainingLoads;
