import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Select from "react-select";
import { useNavigate } from 'react-router-dom';

const FileList = () => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showEdit, setShowEdit] = useState([]);
  const [accessUsersList, setAccessUsersList] = useState();
  const [logout, setLogout] = useState(false);
  const [message, setMessage] = useState(false);
  const [fileBuffer, setFileBuffer] = useState();
  const [fileList, setFileList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [values, setValue] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const navigate = useNavigate();

  const selectedUsers = (value) => {
    console.log("1", value);
    setValue(value.map((e) => e.value));
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClose = async () => {
    setShow(false);
    if (selectedFile && values) {
      let formData = new FormData();
      values.forEach((item) => formData.append("users", item));
      formData.append("file", selectedFile);
      //   console.log(values);
      //   console.log(formData);
      var token = localStorage.getItem("testTask");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const res = await axios.post(
        "http://localhost:3001/api/file",
        formData,
        config
      );
      console.log(res);
      if (res.data == "file saved") {
        setMessage(true);
      }
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      var token = localStorage.getItem("testTask");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const response = await axios.get(
        "http://localhost:3001/api/file",
        config
      );
      console.log("hi", response);
      setFileList(response.data);

      const res = await axios.get("http://localhost:3001/api/users", config);
      const allList = res.data.map((e) => {
        return { value: e._id, label: e.name };
      });
      setUsersList(allList);
    };
    onLoad();
  }, [message]);

  const handleShowFile = async (e) =>{
    console.log(e);
    var token = localStorage.getItem("testTask");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        }
      };
      const response = await axios.get(
        `http://localhost:3001/api/file/show/${e._id}`,
        config
      );
    //   console.log("file", response);
      setFileBuffer(response.data);
      const pdfWindow = window.open();
        pdfWindow.location.href = response.data;
  }

  const handleShow = async () => {
    setShow(true);
  };

  const handleEdit = async (ele) => {
    console.log(ele.user, usersList);
    setShowEdit(ele.filename);
    const newArray = [];
    for(var i=0; i<ele.user.length; i++){
        for(var j=0; j<usersList.length; j++){
            if(usersList[j].value == ele.user[i]){
                newArray.push(usersList[j]);
            }
        }
    }
    // console.log(newArray);
    setAccessUsersList(newArray);
    setEdit(true);
  };

  const handleLogout = async () => {
    // setLogout(false);
    console.log("1");
    localStorage.removeItem("testTask");
    navigate("/");
  };
  const handleCloseEdit = async () => {
    setEdit(false);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <Button variant="primary" onClick={handleShow}>
              Upload File
            </Button>
            <Button variant="primary" className="mx-3" onClick={handleLogout}>
              Logout
            </Button>
            <table className="table table-light table-bordered mt-3">
              <tbody>
                <tr>
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>Edit</th>
                </tr>

                {fileList.map((e, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td onClick={() => handleShowFile(e)}>{e.filename}</td>
                      <td>
                        <Button variant="primary" onClick={() => handleEdit(e)}>
                          Edit
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add File and access</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form method="post">
                <div className="form-group">
                  <label>Add File</label>
                  <input
                    type="file"
                    name="file"
                    onChange={changeHandler}
                    className="form-control mt-3"
                  />
                </div>

                <div className="form-group mt-3">
                  <label>Give access to users</label>
                  <Select
                    defaultValue={[]}
                    isMulti
                    name="colors"
                    options={usersList}
                    onChange={selectedUsers}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
                {message ? (
                  <p className="text-success">File uploaded successfully</p>
                ) : (
                  ""
                )}
                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={handleClose}
                >
                  Upload
                </Button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={edit}
            onHide={handleCloseEdit}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit File Access</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form method="post">
                <div className="form-group">
                  <label>File Name</label>
                  <input
                    type="text"
                    value={showEdit}
                    disabled
                    className="form-control mt-3"
                  />
                </div>

                <div className="form-group mt-3">
                  <label>Give access to users</label>
                  <Select
                    defaultValue={accessUsersList}
                    isMulti
                    name="colors"
                    options={usersList}
                    onChange={selectedUsers}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>

                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={handleCloseEdit}
                >
                  Save
                </Button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default FileList;
