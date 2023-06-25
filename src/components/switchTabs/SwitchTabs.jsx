import React, { useState } from 'react'

const SwitchTabs = ({ data, onCurrentTab }) => {
    const [selectedTab, setSelectedTab] = useState(0)
    const [left, setLeft] = useState(0)

    const activeTab = (item, index) => {

        setLeft(index * 100)
        setTimeout(() => {
            setSelectedTab(index)
        }, 300)
        onCurrentTab(item, index)
    }

    return (
        <div className="h-8 bg-white rounded-[20px] p-0.5">
            <div className="flex items-center h-7 relative">
                {
                    data.map((item, index) =>
                        <span
                            key={index}
                            onClick={() => activeTab(item, index)}
                            className={`tabItem ${selectedTab === index ? "text-white" : ""}` }>
                            {item}
                        </span>
                    )
                }
                <span
                    style={{ left: left }}
                    className="activeTab" />
            </div>
        </div>
    )
}

export default SwitchTabs
