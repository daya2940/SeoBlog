import Link from 'next/link'
import { useEffect, useState, Fragment } from 'react';
import Router from 'next/router'
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router'
import { getAllCategories } from '../../actions/category'
import { getAllTags } from '../../actions/tag'
import { singleBlog, updateBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }); //it is imported for rich text editor
import '../../node_modules/react-quill/dist/quill.snow.css';
import { getCookie, isAuth } from '../../actions/auth';
import { API } from '../../config';

const BlogUpdate = ({ router }) => {


  const [body, setBody] = useState('');
  const [categories, setCategoris] = useState([]);
  const [tags, settags] = useState([]);
  const [checked, setChecked] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const [values, setValue] = useState({
    error: '',
    success: '',
    formData: '',
    title: '',
  });

  const token = getCookie('token');

  const { error, success, formData, title } = values;

  useEffect(() => {
    initBlog();
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
          <input type="checkbox" className="mr-2" checked={checkedCategory(c._id)} onChange={handleToggle(c._id)} />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    )
  }


  const showTags = () => {
    return (
      tags && tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input type="checkbox" className="mr-2" checked={checkedTag(t._id)} onChange={handleToggleTags(t._id)} />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    )
  };

  // showing already checked categories on update
  const checkedCategory = (c) => {
    const result = checked.indexOf(c);
    if(result !==-1){
      return true;
    }
    else{
      return false;
    }
  }

  // showing already checked tag on update
  const checkedTag = (t) => {
    const result = checkedTags.indexOf(t);
    if(result !==-1){
      return true;
    }
    else{
      return false;
    }
  }

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

  const handleBody = e => {
    setBody(e);
    formData.set('body',e);
};

  const handleChange = name => e => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value); //instiating form data
    // for (let pair of formData.entries()) {
    //     console.log(pair[0] + ', ' + pair[1]);
    //   }
    setValue({ ...values, [name]: value, formData, error: '' })
  }


  const editBlog = (e) => {
    e.preventDefault();
    updateBlog(formData,token,router.query.slug).then(data => {
      console.log(data);
      if(data.error){
        setValue({...values,error: data.error})
      }
      else {
        setValue({ ...values, error: '', success: `A new blog titled ${data.title} is updated` });
        if(isAuth && isAuth.role===1){
          Router.replace(`/admin/crud/${router.query.slug}`)
        }
        else if(isAuth && isAuth.role===0){
          Router.replace(`/user/crud/${router.query.slug}`)
        }
      }
    });
  }

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog} className="col-md-12">
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
        </div>
        <div className="form-group">
          <ReactQuill modules={BlogUpdate.modules} formats={BlogUpdate.formats} value={body} placeholder="Write something" onChange={handleBody} />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Update</button>
        </div>
      </form>
    )
  }

  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValue({ ...values, title: data.title });
          setBody(data.body);
          setCategorisArray(data.categories);
          setTagsArray(data.tags);
        }
      })
    }
  }

  const setCategorisArray = blogCategories => {
    let ca = [];
    blogCategories.map((c,i) => {
      ca.push(c._id);
    });
    setChecked(ca);
  }

  const setTagsArray= blogTags => {
    let ta = [];
    blogTags.map((t,i) => {
      ta.push(t._id);
    });
    setCheckedTags(ta);
  }

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9">
            {updateBlogForm()}
            <div className="mt-3">
              {showError()}
              {showSuccess()}
              {body && <img src={`${API}/blog/photo/${router.query.slug}`} alt={title} style={{width: '100%'}} className="mb-2" />}
          </div>
          </div>
          <div className="col-md-3">
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
  )
}

BlogUpdate.modules = {
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

BlogUpdate.formats = [
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

export default withRouter(BlogUpdate);