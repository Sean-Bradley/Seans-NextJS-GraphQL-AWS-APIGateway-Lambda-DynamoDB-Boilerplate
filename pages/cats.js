import React, { Component } from 'react';
import ReactTable from "react-table";

class Cats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            editingId: {},
            catName: "",
            addButtonEnabled: false,
            columns: [{
                Header: 'Id',
                accessor: 'id'
            }, {
                Header: () => (
                    <div style={{ textAlign: "left" }}>Genus</div>
                ),
                accessor: 'genus',
            }, {
                id: "editCell",
                Header: () => (
                    <div style={{ textAlign: "left" }}>Name</div>
                ),
                accessor: 'id',
                Cell: row => (
                    !!this.state.editingId[row.original.id] ?
                        <input id={"input_" + row.original.id} type="text" defaultValue={row.original.name} maxLength="20" placeholder="Cat Name" />
                        :
                        <span id={"name_" + row.original.id}>{row.original.name}</span>
                )
            }, {
                Header: () => (
                    <div style={{ textAlign: "left" }}>Is Hungry</div>
                ),
                id: 'isHungry',
                accessor: row => row.isHungry.toString()
            }, {
                Header: () => (
                    <div style={{ textAlign: "left" }}>Last Fed Date</div>
                ),
                id: 'lastFedDate',
                accessor: row => (new Date(parseInt(row.lastFedDate)).toDateString())
            }, {
                Header: () => (
                    <div style={{ textAlign: "left" }}>Date Added</div>
                ),
                //accessor: 'dateAdded',
                id: 'dateAdded',
                accessor: row => (new Date(parseInt(row.dateAdded)).toDateString())
            }, {
                id: 'edit',
                accessor: 'id',
                Cell: row => (
                    !!this.state.editingId[row.original.id] ?
                        <div>
                            <button id={"saveButton_" + row.original.id} className="btn btn-warning" onClick={(e) => this.handleSaveEdit(row.original.id)}>Save</button>&nbsp;
                                <button id={"cancelButton_" + row.original.id} className="btn btn-secondary" onClick={(e) => this.handleCancelEdit(row.original.id)}>Cancel</button>
                        </div>
                        :
                        <button id={"editButton_" + row.original.id} className="btn btn-success" onClick={(e) => this.handleEditClick(e, row.value)}>Edit</button>
                )
            }, {
                id: 'delete',
                accessor: 'id',
                Cell: ({ value }) => (<button className="btn btn-danger" onClick={(e) => this.handleDeleteClick(e, value)}>Delete</button>)
            }
            ]
        }
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleAddChange = this.handleAddChange.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
        this.handleSaveEdit = this.handleSaveEdit.bind(this);
        this.refreshTableData = this.refreshTableData.bind(this);
    }
    refreshTableData() {
        fetch('https://wl2akb84i9.execute-api.us-east-1.amazonaws.com/dev/animals', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: "query { listAnimals { id, name, genus, isHungry, lastFedDate, dateAdded}}"
        }).then(response => response.json())
            .then(data => {
                this.setState({
                    data: data.data.listAnimals,
                    table: {
                        columns: this.state.columns,
                        data: data.data.listAnimals
                    }
                })
            }).catch(function (error) {
                console.log(error);
            });
    }
    handleSaveEdit(id) {
        const name = document.getElementById("input_" + id).value;
        //console.log(id + " " + name);
        fetch('https://wl2akb84i9.execute-api.us-east-1.amazonaws.com/dev/animals', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `mutation { updateAnimal (id: "${id}", name: "${name}") {id, name, genus, isHungry, lastFedDate }}`
        }).then(() => {
            const editingId = this.state.editingId;
            editingId[id] = false;
            this.setState({ editingId: editingId }, this.refreshTableData());
        }).catch(function (error) {
            console.log(error);
        });
    }
    handleCancelEdit(id) {
        const editingId = this.state.editingId;
        editingId[id] = false;
        this.setState({
            editingId: editingId,
        });
    }
    handleAddClick() {
        fetch('https://wl2akb84i9.execute-api.us-east-1.amazonaws.com/dev/animals', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `mutation {createAnimal (name: "${this.state.catName}", genus: "felis", isHungry: true) { id, name, genus, isHungry, lastFedDate, dateAdded}}`
        }).then(() => {
            this.setState({ catName: '', addButtonEnabled: false }, this.refreshTableData());
        }).catch(function (error) {
            console.log(error);
        });
    };
    handleEditClick(e, id) {
        const editingId = this.state.editingId;
        editingId[id] = true;
        this.setState({
            editingId: editingId,
        });
    }
    handleDeleteClick(e, id) {
        fetch('https://wl2akb84i9.execute-api.us-east-1.amazonaws.com/dev/animals', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `mutation {removeAnimal (id: "${id}")}`
        }).then(() => {
            this.refreshTableData()
        }).catch(function (error) {
            console.log(error);
        });
    }
    handleAddChange(e) {
        const newCatName = e.target.value;
        let enabled = newCatName.length >= 2 && newCatName.length <= 20;
        this.setState({ catName: newCatName, addButtonEnabled: enabled });
    }
    componentWillUnmount() {
        console.log("in cats componentWillUnmount")
    }
    render() {
        let addCatOptions;
        if (this.state.addButtonEnabled) {
            addCatOptions = <button onClick={this.handleAddClick} className="btn btn-primary">Add Cat</button>
        } else {
            addCatOptions = <button disabled className="btn btn-primary disabled">Add Cat</button>
        }

        return (
            <div className="container">
                <h1>Cats</h1>

                <div className="form-group form-inline">
                    <div>
                        <label htmlFor="catName">Cat Name:</label>
                        <input type="text" name="catName" className="form-control" value={this.state.catName} onChange={this.handleAddChange} placeholder="Cat Name" />
                        {addCatOptions}
                    </div>
                </div>

                <ReactTable
                    data={this.state.data}
                    columns={this.state.columns}
                    defaultPageSize={5}
                    className="-striped -highlight"
                    onFetchData={(state, instance) => {
                        this.setState({ loading: true }, this.refreshTableData())
                    }}
                />

                <hr />
                <div>
                    <pre className="componentKeys">{JSON.stringify(Object.keys(this), undefined, 2)}</pre>
                    <pre className="componentProps">{!!this._reactInternalFiber ? JSON.stringify(Object.keys(this._reactInternalFiber), undefined, 2) : ""}</pre>
                    <pre className="componentState">{JSON.stringify(this.state, undefined, 2)}</pre>
                </div>
            </div >
        );
    }
}

export default Cats;