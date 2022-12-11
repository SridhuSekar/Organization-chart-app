import React, { useEffect, useState } from 'react'
import { Tree, TreeNode } from 'react-organizational-chart';
import data from '../data.json'
import './TreeChart.css'


function TreeChart() {

  const [chart, setChart] = useState([])


  useEffect(() => {
    setChart(chartData(data));
  }, [])

  const chartData = (jsonData) => {
    let result = [];
    Object.keys(jsonData).map((e, i) => {
      let arr = []
      Object.values(jsonData).map((f) => {
        if (e == f.manager) {
          f.subManager = []
          arr.push(f);
        } else if (f.manager) {
          arr.map((p) => {
            if (p.id == f.manager) {
              p.subManager.push(f)
            }
          })
        }
      })
      if (arr.length && i === 0) {
        result.push({ [e]: arr })
      }
    })
    return result
  }

  return (
    <>
      {chart.map((grade1, id) => {
        return (
          <Tree key={id} label={<div className='card'>
            <img className='img' src={data[Object.keys(grade1)[0]].img} />
            <div className='name'>{data[Object.keys(grade1)[0]].name}</div>
            <div className='designation'>{data[Object.keys(grade1)[0]].designation}</div>
          </div>}>

            {Object.values(grade1)[0].map((grade2, idx) => {
              return (<TreeNode key={idx} label={<div className='card'>
                <img className='img' src={grade2['img']} />
                <div className='name'>{grade2['name']}</div>
                <div className='designation'>{grade2['designation']}</div>
              </div>} >

                {grade2 && grade2.subManager && grade2.subManager.map((grade3, i) => {
                  return <TreeNode key={i} label={<div className='card'>
                    <img className='img' src={grade3['img']} />
                    <div className='name'>{grade3.name}</div>
                    <div className='designation'>{grade3['designation']}</div>
                  </div>} />

                })}

              </TreeNode>
              )
            })}
          </Tree>)
      })}
    </>
  )
}

export default TreeChart