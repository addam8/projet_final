import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaUsers, FaClipboard, FaPercentage, FaChartBar } from "react-icons/fa";
import axios from "axios";
import Widget from "./summary-components/Widget";
import { setHeaders, url } from "../../features/api";
const Summary = () => {
  const { users, setUsers } = useState([]);
  // console.log(users[0]);
  useEffect(() => {
    function compare(a, b) {
      if (a._id < b._id) {
        return 1;
      }
      if (a._id > b._id) {
        return -1;
      } else return 0;
    }
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/users/stats`, setHeaders());
        res.data.sort(compare);
        // console.log("stats", res.data);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const data = [
    {
      icon: <FaUsers />,
      digits: 7,
      isMoney: false,
      title: "Users",
      color: "rgb(102,108,255)",
      bgColor: "rgba(102,108,255,0.12)",
      percentage: 30,
    },
    {
      icon: <FaClipboard />,
      digits: 70,
      isMoney: false,
      title: "Orders",
      color: "rgb(38,198,249)",
      bgColor: "rgba(38,198,249,0.12)",
      percentage: 20,
    },
    {
      icon: <FaChartBar />,
      digits: 5000,
      isMoney: true,
      title: "Earnings",
      color: "rgb(253,181,40)",
      bgColor: "rgba(253,181,40,0.12)",
      percentage: 60,
    },
  ];

  return (
    <StyledSummary>
      <MainStats>
        <Overview>
          <Title>
            <h2>Overview</h2>
            <p>How your shop is performing compared to the pervious month.</p>
            <WidgetWrapper>
              {data?.map((data, index) => (
                <Widget key={index} data={data} />
              ))}
            </WidgetWrapper>
          </Title>
        </Overview>
      </MainStats>

      <SideStats></SideStats>
    </StyledSummary>
  );
};

export default Summary;

const StyledSummary = styled.div`
  width: 100%;
  display: flex;
`;
const MainStats = styled.div`
  flex: 2;
  width: 100%;
`;
const Title = styled.div`
  p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;

const Overview = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  width: fit-content;

  padding: 1.5rem;
  height: 170px;
  border-radius: 10px;
  display: flex;
  flex-directioon: column;
  justify-content: space-between;
`;

const WidgetWrapper = styled.div`
  padding-top: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`;
