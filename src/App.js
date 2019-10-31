import React, { useState } from "react";
import { useAuth0 } from "./react-auth0-spa";
import request from "./utils/request";
import endpoints from "./endpoints";
import Loading from "./components/Loading";
import RequestPoi from "../src/components/RequestPoi"
import Sidebar from "react-sidebar";

import css from "./App.css";


/* React Leaflet*/
import { Map, TileLayer, Marker, Popup, LayersControl,LayerGroup } from "react-leaflet";
import L from "leaflet";
import {Formik} from "formik";


const { BaseLayer, Overlay } = LayersControl;
let loadApp = false;
let currentUser;







var myIcon = L.icon({
    iconUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",
    iconSize: [25, 41],
    iconAnchor: [22, 94],
    popupAnchor: [-10, -90]
});

var posIcon = L.icon({
    iconUrl:
        "data:image/png;base64,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LzEuMS8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJCQjY3NUYwNDA0NDExRTU4QUM0QTNFMkYzMDQ5NDJBIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBhOGI3ZGY3LWRkZGQtNGM0My05YjQxLTdmMTU5MTQ0M2Q3MiIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjk4M0IyRTY3M0VDQzExRTU5NDVEQTE4OUVDRDVGNUM1IgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJXaW5kb3dzIgogICBHSU1QOlRpbWVTdGFtcD0iMTU3MDcwODIxNDI3NTU0NSIKICAgR0lNUDpWZXJzaW9uPSIyLjEwLjYiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBleGlmOkNvbG9yU3BhY2U9IjY1NTM1IgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjAiCiAgIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSI1NiIKICAgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIKICAgdGlmZjpPcmllbnRhdGlvbj0iMSIKICAgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIKICAgdGlmZjpYUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIgogICB0aWZmOllSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiCiAgIHhtcDpDcmVhdGVEYXRlPSIyMDE1LTA4LTE5VDE1OjI2OjQyLTA0OjAwIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxNS0wOC0yMVQxMjozMjoxMS0wNDowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMTUtMDgtMjFUMTI6MzI6MTEtMDQ6MDAiPgogICA8aXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvbkNyZWF0ZWQ+CiAgIDxpcHRjRXh0OkxvY2F0aW9uU2hvd24+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpMb2NhdGlvblNob3duPgogICA8aXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpBcnR3b3JrT3JPYmplY3Q+CiAgIDxpcHRjRXh0OlJlZ2lzdHJ5SWQ+CiAgICA8cmRmOkJhZy8+CiAgIDwvaXB0Y0V4dDpSZWdpc3RyeUlkPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxOTNiYzM4ZC02OThjLTQwYmMtYjJiNy0xMmFmZjg0YzM0Y2UiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAxNS0wOC0yMVQxMjoxODowNS0wNDowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpkN2JmYjJiYS0zMTM1LTRhYjktODE1Ni04NGUzYjNmZGM2NjkiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAxNS0wOC0yMVQxMjozMjoxMS0wNDowMCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplOTdhMmEyMy1lNGNhLTQwMzctOGEyYy0zM2IxYTVmM2Y2ZTYiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoV2luZG93cykiCiAgICAgIHN0RXZ0OndoZW49IjIwMTktMTAtMTBUMTM6NTA6MTQiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogICA8eG1wTU06RGVyaXZlZEZyb20KICAgIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTgzQjJFNjczRUNDMTFFNTk0NURBMTg5RUNENUY1QzUiCiAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmI4YzgyNTU4LWU1MzUtNDJjNi1hMjViLWViN2ZkZTJlN2Q2MyIvPgogICA8cGx1czpJbWFnZVN1cHBsaWVyPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VTdXBwbGllcj4KICAgPHBsdXM6SW1hZ2VDcmVhdG9yPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6SW1hZ2VDcmVhdG9yPgogICA8cGx1czpDb3B5cmlnaHRPd25lcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkNvcHlyaWdodE93bmVyPgogICA8cGx1czpMaWNlbnNvcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkxpY2Vuc29yPgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQg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",
    iconSize: [25, 41],
    iconAnchor: [22, 94],
    popupAnchor: [-10, -90]
});



class Form extends React.Component {
    constructor(props) {
        super(props);
        this.props=props;
        this.closeMenu = props.closeMenu;
        this.lat = props.lat;
        this.lng = props.lng;
        this.newPoi = props.newPoi;
        this.requestToken = props.requestToken;
        this.useAuth = props.useAuth;
        this.InsertPoi = props.InsertPoi;
        this.Allcategories = props.categories;
        this.AllTags = props.tags;
        this.state = {
            categories: [],
            categoriesString: "",
            status: props.status[1],
            tags: [],
            tagsString: "",
            name: '',
            description: '',
            lat: this.props.lat,
            lng: this.props.lng,
            image: '',
            url: '',
            group: 1,

            poi:{
                name: '',
                description: '',
                lat: this.props.lat,
                lng: this.props.lng,
                image: '',
                url: '',
                group: 1,
                Status: [],
                Tags: [],
                Categories:[]
            }
        }
    }

    change = (e) => {
        this.props.onChange({[e.target.name]: e.target.value})

        this.setState({
            [e.target.name]: e.target.value

        })

        this.setState({
            poi:{
                name: this.state.name,
                description: this.state.description,
                lat: this.props.lat,
                lng: this.props.lng,
                image: this.state.image,
                url: this.state.url,
                group: 1,
                Status: this.state.status,
                Tags: this.state.tags,
                Categories: this.state.categories
            }}
        )

    };

    setSubmit = (e) => {
        e.preventDefault();

        if(this.state.poi.name!==null && this.state.poi.name.length>1){
            this.InsertPoi(this.state.poi);
            this.closeMenu(false);
        } else
            alert("A point cannot be added without a name at least")
    }

    selectChangement= (event) => {
        let id = event.target.value;
        let str = this.state.categoriesString;
        this.Allcategories.map(cat => {
                if(cat.id==id && str.indexOf(cat.name)==-1){
                    console.log(cat)
                    str += cat.name + "  ";
                    this.setState(prevState => ({
                        categories: [...prevState.categories, cat],
                        categoriesString: str
                    }))
                }
            }
        );

        this.setState({
            poi:{
                name: this.state.name,
                description: this.state.description,
                lat: this.props.lat,
                lng: this.props.lng,
                image: this.state.image,
                url: this.state.url,
                group: 1,
                Status: this.state.status,
                Tags: this.state.tags,
                Categories: this.state.categories
            }}
        )


    }

    selectChangementTags =(event) => {
        let id = event.target.value;
        let str = this.state.tagsString;
        this.AllTags.map(tag => {
                if(tag.id==id && str.indexOf(tag.name)==-1){
                    console.log(tag)
                    str += tag.name + "  ";
                    this.setState(prevState => ({
                        tags: [...prevState.tags, tag],
                        tagsString: str
                    }))
                    console.log(this.state.tags);
                }
            }
        );

        this.setState({
            poi:{
                name: this.state.name,
                description: this.state.description,
                lat: this.props.lat,
                lng: this.props.lng,
                image: this.state.image,
                url: this.state.url,
                group: 1,
                Status: this.state.status,
                Tags: this.state.tags,
                Categories: this.state.categories
            }}
        )
    }






    render() {


        return(

            <Formik >
                <form className={"form"}>

                    <input
                        type='text'
                        disabled
                        value={'Informations Générales'}
                        style={{borderBottom: 0, textAlign:'center', fontWeight:'bold', fontSize: 19}}
                    />
                    <textarea
                        type='text'
                        name='name'
                        placeholder='Name'
                        value={this.state.name}
                        onChange={e => this.change(e)}
                        required={true}
                    />
                    <br/>

                    <textarea
                        type='text'
                        name='description'
                        placeholder='Description'
                        value={this.state.description}
                        onChange={e => this.change(e)}
                    required={true}
                    style={{height: 80}}/>
                    <br/>
                    <div style={{display: 'inline'}}>
                    <input
                        type='text'
                        disabled
                        name='status'
                        placeholder='Status :'
                        value={'Status : '}
                        style={{width:80, display:'inline', borderBottom:0}}
                    /><input
                    type='text'
                    disabled
                    name='status'
                    placeholder='Status :'
                    value={this.state.status.name}
                    style={{width:90, color:'yellow', display:'inline', borderBottom:0}}
                />
                    </div>
                    <br/><br/>
                    <input
                        type='text'
                        disabled
                        value={'Coordonnées GPS'}
                        style={{borderBottom: 0, textAlign:'center', fontWeight:'bold', fontSize: 19}}
                    />
                    <input
                        type='text'
                        disabled
                        name='lat'
                        placeholder='lat'
                        value={'lat : ' + this.props.lat}
                        onChange={e => this.change(e)}               />
                    <br/>


                    <input
                        type='text'
                        disabled
                        name={this.props.lng}
                        placeholder={this.props.lng}
                        value={'lng : ' + this.props.lng}
                        onChange={e => this.change(e)}               />
                    <br/>


                    <input
                        type='text'
                        name='image'
                        placeholder='Image URL'
                        value={this.state.image}
                        onChange={e => this.change(e)}               />
                    <br/>



                    <input
                        type='text'
                        name='url'
                        placeholder='Site Url'
                        value={this.state.url}
                        onChange={e => this.change(e)}               />
                    <br/>

                    <input
                        type='text'
                        disabled
                        name='group'
                        placeholder={1}
                        value={'Group : 1'}
                    />
                    <br/><br/>
                    <input
                        type='text'
                        disabled
                        value={'Catégories'}
                        style={{borderBottom: 0, textAlign:'center', fontWeight:'bold', fontSize: 19}}
                    />
                    <textarea
                        type='text'
                        disabled
                        name='categories'
                        placeholder=''
                        value={this.state.categoriesString}
                        style={{height: 80}}
                    />
                    <select id='testSelect1' value={this.state.catValue} onChange={this.selectChangement}>
                        <option>Choose categories...</option>
                        {this.Allcategories.map(cat =>(
                            <option value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    <input
                        type='text'
                        disabled
                        value={'Tags'}
                        style={{borderBottom: 0, textAlign:'center', fontWeight:'bold', fontSize: 19}}
                    />

                    <textarea
                        type='text'
                        disabled
                        name='tags'
                        placeholder=''
                        value={this.state.tagsString}
                        style={{height: 80}}
                    />
                    <select id='testSelect1' onChange={this.selectChangementTags}>
                        <option>Choose Tags...</option>
                        {this.AllTags.map(tag =>(
                            <option value={tag.id}>{tag.name}</option>
                        ))}
                    </select>




                    <br/>


                    <button className="button" id="submitButton" value={this.state.poi} onClick={this.setSubmit}>Submit</button>

                </form>
            </Formik>

        )

    }


}


class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        this.nbClicks = 0;
        this.props = props;
        this.mapRef = React.createRef();
        this.actualPointLat = 0;
        this.actualPointLng = 0;
        this.logout = props.logout;
        this.state = {
            latlng: {
                lat: 46.283,
                lng: 7.536
            },
            markers: this.props.pois,
            addMarkerEnabled: false,
            sidebarOpen: false,
            categories: this.props.categories,
            status: this.props.status,
            tags: this.props.tags
        };

        this.insertPoi = props.InsertPoi;
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.DeletePoi = props.deletePoi;
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    addPoi = () => {
        if(this.state.addMarkerEnabled===false)
            this.state.addMarkerEnabled = true

        this.onSetSidebarOpen(false);
    }

    deletePoi = (pos) => {
        let data = this.DeletePoi(pos.id,this.updateMap,pos);
    }

    updateMap = (data) => {
        let { markers } = this.state;

        for( var i = 0; i < markers.length; i++){
            if ( markers[i].id === data.id) {
                markers.splice(i, 1);
                i--;
            }
        }

        this.setState({ markers });
    }


    localiseUser = () => {
        const { markers } = this.state;
        let alreadyPositioned = false;
        this.onSetSidebarOpen(false);
        markers.map(marker =>
            marker.name === "Your position"
                ? (alreadyPositioned = true)
                : (alreadyPositioned = false)
        );

        alreadyPositioned === false &&
        navigator.geolocation.getCurrentPosition(position => {
            {
                console.log(position.coords.latitude, position.coords.longitude);
                console.log(markers);
                let marker = { ...markers[0] };
                marker.name = "Your position";
                marker.image = "";
                marker.description = "You are here, precisely !";
                marker.lat = position.coords.latitude;
                marker.lng = position.coords.longitude;
                marker.id = 0;
                marker.createdAt = new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString();
                markers.push(marker);

                this.setState({
                    latlng: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                });

                this.setState({markers});
                this.mapRef.leafletElement.flyTo(this.state.latlng, 18);

            }
        });

        if (alreadyPositioned === true) {
            this.mapRef.leafletElement.flyTo(this.state.latlng, 18);
        }
    };
    handleLocationFound = (e: Object) => {
        this.setState({
            latlng: e.latlng
        });
    };

    addMarker = e => {
        if (this.state.addMarkerEnabled === true) {
            console.log(this.state);
            this.nbClicks++;
            let { markers } = this.state;
            this.actualPointLat = e.latlng.lat;
            this.actualPointLng = e.latlng.lng;
            this.mapRef.leafletElement.flyTo(e.latlng, 18);

            if(this.nbClicks<=1){
                markers.push(e.latlng);
            } else {

                console.log("MARKER VALUE "  + markers[markers.length-1].name);

                if(markers[markers.length-1].name === "" || markers[markers.length-1].name == null){
                    markers.pop();
                }


                markers.push(e.latlng);
            }







            this.setState({ markers });
            console.log(this.state);
            this.onSetSidebarOpen(true);
        }
    };

    InsertPoi = (poi) => {
        this.insertPoi(poi);
        let { markers } = this.state;
        markers.pop();
        markers.push(poi);
        this.setState({ markers });
    }



    state = {
        fields:{}
    };

    onChange = updateValue => {
        this.setState({fields:
                {
                    ...this.state.fields,
                    ...updateValue
                }
        });

    }



    render() {
        return (
            <div>
                <div className={loadApp?"topDiv":"hidden"}>
                    <Sidebar
                        sidebar={<div>
                            <button className={"button"} id="localisation-button" onClick={this.closeButtonAction}>
                                Close
                            </button>
                            <button className={"button"} id="localisation-button" onClick={this.localiseUser}>
                                My localisation
                            </button>
                            <button className={"button"} id="add-poi-button" onClick={this.addPoi}>
                                Add Point of Interest
                            </button>
                            {this.generateForm()}

                        </div>}
                        open={this.state.sidebarOpen}
                        styles={{
                            root: {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                overflow: "hidden"
                            },
                            sidebar: {
                                maxWidth: 400,
                                zIndex: 4,
                                position: "absolute",
                                top: 0,
                                bottom: 0,
                                transition: "transform .3s ease-out",
                                WebkitTransition: "-webkit-transform .3s ease-out",
                                willChange: "transform",
                                overflowY: "auto"
                            },
                            content: {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                overflowY: "auto",
                                WebkitOverflowScrolling: "touch",
                                transition: "left .3s ease-out, right .3s ease-out"
                            },
                            overlay: {
                                zIndex: 3,
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                opacity: 0,
                                visibility: "hidden",
                                transition: "opacity .3s ease-out, visibility .3s ease-out",
                                backgroundColor: "rgba(0,0,0,.5)"
                            },
                            dragHandle: {
                                zIndex: 1,
                                position: "fixed",
                                top: 0,
                                bottom: 0
                            }
                        }}
                    >

                        <div className={"topDivContainer"}>
                            <h2  className={loadApp?"MainTitle":"hidden"}> Mapathon - Group 1</h2>
                            <div style={{float:'right', margin:'100px'}}>
                                <divc >
                                    <img height={100} width={100} src={currentUser.picture}></img>
                                    <p>{currentUser.nickname}</p>
                                </divc>
                                <br/>
                                <br/>
                                <br/>
                                <button target ="_blank" className={"button2"} onClick={this.logout}>logout</button>
                                <br/>
                                <br/>
                                <br/>
                                <button  target ="_blank" className={"button2"} onClick={() => this.onSetSidebarOpen(true)}>Menu</button>
                            </div>
                        </div>
                    </Sidebar>
                </div>
                <Map

                    className="mapClass"
                    center={this.state.latlng}
                    onClick={this.addMarker}
                    zoom={13}
                    useFlyTo={true}
                    ref={m => (this.mapRef = m)}
                    onLocationfound={this.handleLocationFound}
                >
                    <LayersControl>

                        <BaseLayer name="OpenToMap">
                            <TileLayer
                                attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                            />
                        </BaseLayer>
                        <BaseLayer checked name="OpenStreetMap">
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                            />
                        </BaseLayer>

                        <Overlay name="All Markers" checked>
                            <LayerGroup>

                                {this.generateGroupMarkers(0)}

                            </LayerGroup>
                        </Overlay>
                        <Overlay name="Group 1 Markers">
                            <LayerGroup>
                                {this.generateGroupMarkers(1)}
                            </LayerGroup>
                        </Overlay>
                        <Overlay name="Group 2 Markers">
                            <LayerGroup>
                                {this.generateGroupMarkers(2)}
                            </LayerGroup>
                        </Overlay>
                        <Overlay name="Group 3 Markers">
                            <LayerGroup>
                                {this.generateGroupMarkers(3)}
                            </LayerGroup>
                        </Overlay>
                        <Overlay name="Group 4 Markers">
                            <LayerGroup>
                                {this.generateGroupMarkers(4)}
                            </LayerGroup>
                        </Overlay>
                        <Overlay name={"My points"}>
                            <LayerGroup>
                                {this.generateGroupMarkers("User search")}
                            </LayerGroup>
                        </Overlay>
                    </LayersControl>
                </Map>







            </div>
        );
    }

    displayCategories(position) {
        if(typeof position.Categories !== 'undefined' && position.Categories.length !== 0){
            return(
                <div><p>Categories :</p>
                    {position.Categories.map(categorie =>(

                        <p>{categorie.name}</p>

                    ))}
                </div>);
        }
        return <div>Categories : No Categories.</div>
    }

    generateGroupMarkers(number) {
        if(number===0){
            return (<div>{this.state.markers.map(position => (
                <Marker
                    icon={position.name === "Your position" ? posIcon : myIcon}
                    position={position}
                >
                    {position.name !== "Your position" ?
                    <Popup
                        ref={n =>
                            position.name === "Your position"
                                ? (this.popupRef = n)
                                : (this.popupRef = null)
                        }
                    >
                        <h1>{position.name}</h1>
                        <h3>Position : [{position.lat},{position.lng}]</h3>
                        <p>Status : {(typeof position.Status !== 'undefined' && position.Status!== null)?position.Status.name:'none'}</p>
                        {this.dateFormatFunction(position)}
                        <p>By group : {typeof position.Creator !== 'undefined' ? position.Creator.group : position.group}</p>
                        <img src={position.image} />
                        <p>{position.description}</p>
                        {(typeof position.Categories !== 'undefined' && position.Categories!== null)? this.displayCategories(position):<div>Categories : No categories.</div>}
                        {this.generateTags(position)}

                        <button onClick={this.likeFunction}>Like/Dislike</button>
                        <button onClick={event => {event.preventDefault(); this.deletePoi(position)}}>DELETE</button>
                    </Popup>

                    :<Popup
                        ref={n =>
                            position.name === "Your position"
                                ? (this.popupRef = n)
                                : (this.popupRef = null)
                        }
                    >
                        <h1>{position.name}</h1>
                        <h3>Position : [{position.lat},{position.lng}]</h3>
                        <p>Position generated at : {position.createdAt}</p>
                        <img src={position.image} />
                        <p>{position.description}</p>
                    </Popup>}
                </Marker>
            ))}</div>);
        }


        if(typeof number === 'string'){
            return <div>
                {this.state.markers.map(position => (
                    (typeof position.Creator !== 'undefined' && position.Creator.id===currentUser.sub)?
                        <Marker
                            icon={position.name === "Your position" ? posIcon : myIcon}
                            position={position}
                        >
                            <Popup
                                ref={n =>
                                    position.name === "Your position"
                                        ? (this.popupRef = n)
                                        : (this.popupRef = null)
                                }
                            >
                                <h1>{position.name}</h1>
                                <h3>Position : [{position.lat},{position.lng}]</h3>
                                <p>Status : {(typeof position.Status !== 'undefined' && position.Status!== null)?position.Status.name:'none'}</p>
                                <p>Created at : {position.createdAt}</p>
                                <p>By group : {typeof position.Creator !== 'undefined' ? position.Creator.group : position.group}</p>
                                <img src={position.image} />
                                <p>{position.description}</p>
                                {(typeof position.Categories !== 'undefined' && position.Categories!== null)? this.displayCategories(position):<div>Categories : No categories.</div>}
                                {this.generateTags(position)}
                                <button onClick={this.likeFunction}>Like/Dislike</button>

                                {position.name === "Your position" ? <div></div> : <button onClick={event => {event.preventDefault(); this.deletePoi(position)}}>DELETE</button>}
                            </Popup>
                        </Marker>:<div></div>
                ))}
            </div>
        }


        return <div>
            {this.state.markers.map(position => (
                (typeof position.Creator !== 'undefined' && position.Creator.group===number)?
                    <Marker
                        icon={position.name === "Your position" ? posIcon : myIcon}
                        position={position}
                    >
                        <Popup
                            ref={n =>
                                position.name === "Your position"
                                    ? (this.popupRef = n)
                                    : (this.popupRef = null)
                            }
                        >
                            <h1>{position.name}</h1>
                            <h3>Position : [{position.lat},{position.lng}]</h3>
                            <p>Status : {(typeof position.Status !== 'undefined' && position.Status!== null)?position.Status.name:'none'}</p>
                            <p>Created at : {position.createdAt}</p>
                            <p>By group : {typeof position.Creator !== 'undefined' ? position.Creator.group : position.group}</p>
                            <img src={position.image} />
                            <p>{position.description}</p>
                            {(typeof position.Categories !== 'undefined' && position.Categories!== null)? this.displayCategories(position):<div>Categories : No categories.</div>}
                            {this.generateTags(position)}
                            <button onClick={this.likeFunction}>Like/Dislike</button>

                            {position.name === "Your position" ? <div></div> : <button onClick={event => {event.preventDefault(); this.deletePoi(position)}}>DELETE</button>}
                        </Popup>
                    </Marker>:<div></div>
            ))}
        </div>


    }

    dateFormatFunction(position) {
       let date = new Date(Date.parse(position.createdAt)).toLocaleDateString() + " - " + new Date(Date.parse(position.createdAt)).toLocaleTimeString();

           return (<p>Created at : {date}</p>);
    }



    likeFunction() {

    }

    generateTags(position) {
        if(typeof position.Tags !== 'undefined' && position.Tags.length !== 0){
            return(
                <div>
                    <p> Tags : </p>
                    {position.Tags.map(Tag =>(

                        <p style={{color:'blue'}}>{!Tag.name.includes('Like_')?Tag.name:''}</p>

                    ))}
                </div>);
        }
        return <div>Tags : No Tags.</div>
    }



    generateForm() {

        if(this.state.addMarkerEnabled === true) { return <div className={Form}>
            <Form onChange={fields=> this.onChange(fields)} InsertPoi={this.InsertPoi} lat={this.actualPointLat} lng={this.actualPointLng} categories={this.state.categories} status={this.state.status} tags={this.state.tags} closeMenu={this.onSetSidebarOpen}/>
        </div>};


    }


    closeButtonAction = (e) => {
        e.preventDefault();
        this.onSetSidebarOpen(false);

        let markers = this.state.markers;

        if(this.state.addMarkerEnabled===true){
            this.state.addMarkerEnabled=false;
            if(markers[markers.length-1].name === "" || markers[markers.length-1].name == null){
                markers.pop();
            }
            this.setState({ markers });
        }

    }
}





function App() {

    let [pois, setPois] = useState([]);
    let [categories, setCategories] = useState([]);
    let [status, setStatus] = useState([]);
    let [tags, setTags] = useState([]);
    let {loading, loginWithRedirect, getTokenSilently ,user, logout} = useAuth0();

    let loadApplication = async e => {
        loadApp = true;
        let pois = await request(
            `${process.env.REACT_APP_SERVER_URL}${endpoints.pois}`,
            getTokenSilently,
            loginWithRedirect
        );

        currentUser = user;
        console.log(currentUser);
        if (pois && pois.length > 0) {
            console.log(pois);
            setPois(pois);
        }


        await getGPX();


        let cats = await request(
            `${process.env.REACT_APP_SERVER_URL}/category`,
            getTokenSilently,
            loginWithRedirect
        );

        console.log(cats)
        if (cats && cats.length > 0) {
            setCategories(cats);
        }

        let tags = await request(
            `${process.env.REACT_APP_SERVER_URL}/tag`,
            getTokenSilently,
            loginWithRedirect
        );
        console.log(tags)


        if (tags && tags.length > 0) {
            setTags(tags);
        }

        let status = await request(
            `${process.env.REACT_APP_SERVER_URL}/status`,
            getTokenSilently,
            loginWithRedirect
        );
        console.log(status)

        if (status && status.length > 0) {
            setStatus(status);
        }

    };


    if (loading) {
        return <Loading />;
    }



    return (
        <div  className="App">
            <header className="App-header" id="AppHead">
                {(pois && pois.length > 0 && categories && categories.length > 0 && status && status.length > 0 && tags && tags.length > 0)&&
                <MapComponent pois={pois} InsertPoi = {InsertPoi} deletePoi={deletePoi} logout={logout} categories={categories} status={status} tags={tags}/>}
                <br />
                <button class={loadApp?"hidden":"button"} id="Start-button" onClick={loadApplication}>
                    Run the application
                </button>
            </header>
        </div>
    );

    async function InsertPoi(newPoi) {
        let data ;
        data = await  RequestPoi.setPOI(newPoi, getTokenSilently, loginWithRedirect);

        console.log(data);

    }

    async function deletePoi(poi,updateMap,pos){

        console.log("DELETEING POI " + poi);


        let data;
        data = await RequestPoi.deletePOI(poi, getTokenSilently, loginWithRedirect)

        console.log(data);

        if(data.error!=null){
            if(data.error.status===403){
                alert("You cannot delete someone else's P.O.I");
            }
        } else {
            updateMap(pos);
            console.log("UPDATING MAP");
        }

        return data;

    }

    async function getGPX(){

        let data;
        data = await RequestPoi.getGPXFiles(getTokenSilently, loginWithRedirect)

        console.log("GPX " + data);

    }
}




export default App;
