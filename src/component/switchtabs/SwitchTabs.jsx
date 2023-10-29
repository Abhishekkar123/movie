import React, { useEffect, useState } from 'react'
import './style.scss'


const SwitchTabs = ({data,onTabChange}) => {
  const [selectTab,setSelectTab]=useState(0);
  const [left,setLeft]=useState(0);


  

const activeTab=(tab,ind)=>{
  setLeft(ind*100);
  setTimeout(()=>{
   setSelectTab(ind)
  },300);

  onTabChange(tab,ind)

}
  return (
    <div className="switchingTabs">
            <div className="tabItems">
                {data.map((tab, index) => (
                    <span
                        key={index}
                        className={`tabItem ${
                            selectTab === index ? "active" : ""
                        }`}
                        onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                <span className="movingBg" style={{ left }} />
            </div>
        </div>
    );
}

export default SwitchTabs
