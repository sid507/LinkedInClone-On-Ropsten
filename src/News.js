import { Icon } from '@material-ui/core'
import { FiberManualRecord, FiberSmartRecord } from '@material-ui/icons'
import React from 'react'



function News() {

    var newsArticle=[
        {title:"MBA aspirants eye local schools",reader:"6478"},
        {title:"MBA aspirants eye local schools",reader:"6478"},
        {title:"MBA aspirants eye local schools",reader:"6478"},
        {title:"MBA aspirants eye local schools",reader:"6478"},
        {title:"MBA aspirants eye local schools",reader:"6478"},
    ]

    return (
        <div className="flex flex-col lg:basis-1/5 ">
            

            <div className="flex flex-col bg-white px-2 py-3 rounded-lg">
            <div className="normalTextBold text-black">Linkedin News</div>
                {
                    newsArticle.map((data)=>
                    <div className="flex flex-row gap-2">
                        <FiberManualRecord className="my-auto text-blue-500"></FiberManualRecord>
                        <div className="flex flex-col text-sm">
                            <div className="normalTextBold">
                                {data.title}
                            </div>
                            <div className="normalText">
                                {data.reader} Readers
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default News
