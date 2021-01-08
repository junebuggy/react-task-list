import React, { Component } from 'react';


class TaskOutput extends Component {
  render(){
    return (
        <div className="Task_Output" >
          <p>{this.props.state.typed.f_name}, {this.props.state.typed.l_name},{this.props.state.typed.task}</p>
        </div>

    );
  }

}

class TaskList extends Component {


  render(){
    return (
        <div className="Task_List" >
          {
            this.props.list.map((item, index)=> {
              return (<p key={index}>{item.f_name}, {item.l_name},{item.task}<button data-key={index} onClick={this.props.deleteRecord}>remove</button></p>)
            })
          }
        </div>

    );
  }

}


class TaskInfo extends Component {

  constructor(props){
    super(props);
    this.state = {typed:{f_name: '', l_name: '', task: ''},list:[]}
    
    this.updateField = this.updateField.bind(this);
    this.cancelSubmit = this.cancelSubmit.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
  }

  updateField(event){
    var x = event.target.attributes.getNamedItem("name").value;
    var y = this.state;
    y.typed[x]= event.target.value;
    this.setState({y}); 
    //this.setState({typed:{[x]: event.target.value}});
  }
  
  cancelSubmit(event){
    event.preventDefault();
    const data = new FormData(event.target);
    var y = this.state;
    y.list.push({f_name:data.get('f_name'),
           l_name:data.get('l_name'),
           task:data.get('task')});
    
    this.setState({y});
  }
  
  deleteRecord(event){
    event.preventDefault();
    
    var index = event.target.attributes.getNamedItem("data-key").value;
    alert(index);
    var y = this.state;
    delete y.list[index];
    this.setState({y});
  }

  render() {
    return (
      <div className="TaskInfo">
       
             <form onSubmit={this.cancelSubmit}>
                 <label>First Name:</label>
                 <input type="text" name="f_name" id="f_name" onChange={this.updateField} />

                 <label>Last Name: </label>
                 <input type="text" name="l_name" id="l_name" onChange={this.updateField} />
  
                 <label>Task: </label>
                 <input type="text" name="task" id="task" onChange={this.updateField} />
                 <input type="submit" name="submit" value="submit" onChange={this.updateField}/>
             </form>
        
        <TaskOutput 
          state={this.state} />
        <TaskList
          list={this.state.list} 
          deleteRecord={this.deleteRecord} />
      </div>
    );
  }
}

export default TaskInfo;

