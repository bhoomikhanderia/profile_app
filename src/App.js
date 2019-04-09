import React, { Component } from 'react';
import './App.css';
import { withAuthenticator, PhotoPicker, S3Image } from 'aws-amplify-react';
import { Auth, Storage } from 'aws-amplify';

//  --3--
// const previewStyle = {
//     width:320,
//     height: 320,
//     objectFit: 'cover',
//     borderRadius:'50%'
// }
//  --3--

class App extends Component {
    constructor() {
        super();

    //    --3--
    //     this.state = { previewSrc: null};
    //    --3--
    }

    //--1--
    state = {fileUrl: '', file:'', filename:''}
    handleChange = e => {
        const file = e.target.files[0]
        this.setState({
            fileUrl: URL.createObjectURL(file),
            file,
            filename: file.name
        })
    }

    saveFile = () => {
        Storage.put(this.state.filename, this.state.file)
            .then(() => {
                console.log('successfully saved file!')
                this.setState({fileUrl:'', file:'', filename:''})
            })
            .catch(err => {
                console.log('error uploading file!', err)
            })
    }
    //---1--

    //--2--
    // onChange(e) {
    //     const file = e.target.files[0];
    //     Storage.put('example.png', file, {
    //         contentType: 'image/png'
    //     })
    //         .then (result => console.log(result))
    //         .catch(err => console.log(err));
    // }
  //  --2--



  componentDidMount(){

      // const user = Auth.currentAuthenticatedUser()
      // user
      //     .then(user => {
      //         return Auth.changePassword(user, 'oldPassword', 'newPassword');
      //     })
      //     .then(data => console.log(data))
      //     .catch(err => console.log(err));

      Storage.get('fileUrl')
          .then(data => {
              this.setState({
                  fileUrl: data
              })
          })
          .catch(err =>
              console.log('error fetching image'));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the Profile App!</h1>
        </header>

          <div className="uploadImg">
              {/*--2--*/}
          {/*<input*/}
              {/*type="file" accept='image/png'*/}
              {/*onChange={(e) => this.onChange(e)}*/}
          {/*/>*/}
          {/*--2--*/}

          {/*--1--*/}
          <div>
              <img src={this.state.fileUrl}/>
              {/*<img src={this.state.previewSrc} style={previewStyle}/>*/}
          </div>

          <input type='file'  onChange={this.handleChange} />
              {/**/}
          <button  onClick={this.saveFile} >Save File</button>
          {/*--1--*/}

          {/*--3--*/}
          {/*<img src={this.state.previewSrc} style={previewStyle}/>*/}
          {/*<PhotoPicker*/}
            {/*title="Upload Profile Picture"*/}
            {/*preview="hidden"*/}
            {/*onLoad={url => this.setState({previewSrc:url})}*/}
            {/*// onLoad={this.saveFile}*/}
              {/*onSelect={this.saveFile}*/}
          {/*/>*/}
              {/*<S3Image imgKey={key} body={this.state.image_body} picker/>*/}
          {/*--3--*/}
          </div>
      </div>
    );
  }
}

export default withAuthenticator(App,
    {includeGreetings:true});
