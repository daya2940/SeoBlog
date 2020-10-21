import Link from 'next/link'
import { useEffect, useState, Fragment } from 'react';
import Router from 'next/router'
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router'
import { getCookie, isAuth } from '../../../actions/auth'
import { getAllCategories } from '../../../actions/category'
import { getAllTags } from '../../../actions/tag'
import { createBlog } from '../../../actions/blog';
import Layout from '../../../component/layout'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }); //it is imported for rich text editor
import '../../../node_modules/react-quill/dist/quill.snow.css';

const BlogCreate = ({ router }) => {

  const blogFromLs = () => {
    if (typeof window === 'undefined')
      return false;
    if (localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else {
      return false;
    }
  }

  const [body, setBody] = useState(blogFromLs);
  const [values, setValue] = useState({
    sizeError: '',
    error: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: '',
  });


  const [categories, setCategoris] = useState([]);
  const [tags, settags] = useState([]);
  const [checked, setChecked] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const { error, sizeError, success, formData, title, hidePublishButton } = values;
  const token = getCookie('token');

  useEffect(() => {
    setValue({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);



  const initCategories = () => {
    getAllCategories().then(data => {
      if (data.error) {
        setValue[{ ...values, error: data.error }]
      }
      else {
        setCategoris(data);
      }
    });
  };


  //toggling of checkboxes
  const handleToggle = (c) => () => {
    setValue({ ...values, error: '' });
    const all = [...checked];
    const clickedCategory = checked.indexOf(c);
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    setChecked(all);
    formData.set('categories', all);
  }



  const handleToggleTags = (c) => () => {
    setValue({ ...values, error: '' });
    const all = [...checkedTags];
    const clickedTag = checkedTags.indexOf(c);
    if (clickedTag === -1) {
      all.push(c);
    } else {
      all.splice(clickedTag, 1);
    }
    console.log(all);
    setCheckedTags(all);
    formData.set('tags', all);
  }



  const showCategories = () => {
    return (
      categories && categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input type="checkbox" className="mr-2" onChange={handleToggle(c._id)} />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    )
  }


  const showTags = () => {
    return (
      tags && tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input type="checkbox" className="mr-2" onChange={handleToggleTags(t._id)} />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    )
  };

  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
  );

  const showSuccess = () => (
    <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>{success}</div>
  );

  //network call
  const initTags = () => {
    getAllTags().then(data => {
      if (data.error) {
        setValue[{ ...values, error: data.error }]
      }
      else {
        settags(data);
      }
    });
  }



  const createBlogForm = () => {

    const publishBlog = (e) => {
      e.preventDefault();
      createBlog(formData, token).then((data) => {
        console.log(data);
        if (data.error) {
          // for (var pair of formData.entries()) {
          //   console.log(pair[0] + ', ' + pair[1]);
          // }
          setValue({ ...values, error: data.error })
        }
        else {
          setValue({ ...values, title: '', error: '', success: `A new blog titled ${data.title} is created` });
          console.log(values.formData);
          setBody('');
          setCategoris([]);
          settags([]);
        }
      });
    };

    const handleBody = (e) => {
      setBody(e);
      formData.set('body', e);
      if (typeof window !== undefined) {
        //setting the data in the storage to avoid loss of data when page refresh
        localStorage.setItem('blog', JSON.stringify(e));
      }
    }

    return (
      <form onSubmit={publishBlog} className="col-md-12">
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
        </div>
        <div className="form-group">
          <ReactQuill modules={BlogCreate.modules} formats={BlogCreate.formats} value={body} placeholder="Write something" onChange={handleBody} />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Publish</button>
        </div>
      </form>
    )
  }

  const handleChange = name => e => {
    // console.log(e.target.value);
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value); //instiating form data
    console.log('create',formData);
    setValue({ ...values, [name]: value, formData, error: '' })
  }

  return (
    <Layout>
    <Fragment>
      <h2>Create a new blog</h2>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            {createBlogForm()}
            <div className="mt-3">
              {showError()}
              {showSuccess()}
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <div className="form-group pb-2">
                <h5>Featured image</h5>
                <hr />
                <small className="text-muted">Max Size: 1 Mb</small>
                <label className=" d-flex btn btn-outline-info " style={{ maxWidth: '200px' }}>
                  upload feature image
                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                </label>
              </div>
            </div>
            <div>
              <h5>Categories</h5>
              <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showCategories()}</ul>
              <hr />
            </div>
            <div>
              <h5>Tags</h5>
              <hr />
              <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    </Layout>
  );
};

BlogCreate.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block']
  ]
};

BlogCreate.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block'
];

export default withRouter(BlogCreate)