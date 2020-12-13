import Axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ARTICLE_LIST_URL } from './Axios_app'
import { Link, useHistory } from 'react-router-dom';
import { Authcontext } from '../context_api(redux)/create_context/authcontext';
import { IsAuthenticated } from './Isauthenticated';

const ArticleList = () => {

    const history = useHistory();
    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(Authcontext);

    useEffect(() => {
        const articleList_load = () => {
            if (localStorage.getItem('access')) {
                const access_token = localStorage.getItem('access');
                const config = {
                    headers: {
                        'Authorization': `JWT ${access_token}`
                    }
                };
                Axios.get(ARTICLE_LIST_URL, config)
                    .then((res) => {
                        setData(res.data)
                    })
                    .catch((err) => {
                        localStorage.removeItem('access');
                        localStorage.removeItem('refresh');
                        history.push('/login')
                    });
            }
            else {
                history.push('/login')
            };
        };
        articleList_load();
    }, []);

    if (!state.uDetail.isAuthenticated) {
        IsAuthenticated(dispatch);
    }

    return (
        <Fragment>
            {
                data?.map((item) => (
                    <div key={item.id} className="card" style={{ width: '50rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">Title : {item.title}</h5>
                            <p className="card-text">Content : {item.content}</p>
                            <Link to="#" className="card-link">Edit</Link>
                            <Link to="#" className="card-link">Delete</Link>
                        </div>
                    </div>
                ))}
        </Fragment>
    )
}

export default ArticleList
