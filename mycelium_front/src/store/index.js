import { createStore } from 'vuex'

var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "Bearer " + localStorage.getItem('bearer'));
myHeaders.append("Content-Type", "application/json");
let url = "http://127.0.0.1:8000/api/";




const store = createStore({

    state: {

        //- USER -        
        user: null,
        users: [{ id: 0, username: "", phone: "", email: "", created_at: "", admin: 0 }],

        notification: 'null',
        loginError: 'null',

        //- POST -
        posts: [{ id: 1, created_at: "", score: 0, username: "", phone: "", link: "", title: "", content: "", image: "" }, ],
        post: { id: 0, created_at: "", username: "", link: "", title: "", content: "", image: "" },
        newPost: { link: "", title: "", content: "", image: "https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png" },

        //- COM -
        coms: [{ id: 0, post_id: 0, created_at: "", username: "", content: "", hide: 0 }],
        comsHidden: true,

        //- FOUND -
        found: false,
        darkMode: "false"
    },


    // ---------- GETTER -------------------------------------------------------------------------------------------------------
    getters: {

        getFound(state) {
            return state.found;
        },
        getDarkMode(state) {
            return state.darkMode
        },

        isAdmin(state) {
            let index = state.users.findIndex(x => x.id === parseInt(atob(localStorage.getItem('id'))));
            if (index != -1) {
                if (state.users[index].admin == 1) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        },

        getToken(state) {
            return state.token
        },

        getNotif(state) {
            return state.notification
        },

        getLoginError(state) {
            return state.loginError
        },

        getAllUsers(state) {
            console.log(state);
            return state.users

        },

        getUser(state) {
            return { username: state.username, password: state.password }
        },

        getProfile(state) {
            console.log(state.user);
            return state.user;
        },


        // --- POST ---
        getAllPosts(state) {
            // console.log("<- Getter Posts: ", state.posts);
            return state.posts
        },

        getNewPost(state) {
            // console.log("<- Getter newPost :", state.newPost);
            return state.newPost
        },

        getPost(state) {
            // console.log("<- Getter Post :", state.post);
            return state.post
        },


        // --- COM ---
        getComs(state) {
            // console.log("<- Getter Coms :", state.coms);
            return state.coms
        },

        getComsHidden(state) {
            // console.log("<- Getter Coms Hidden :", state.comsHidden);
            return state.comsHidden
        }


    },


    // ---------- MUTATION -----------------------------------------------------------------------------------------------------
    mutations: {

        setDarkMode(state, value) {
            state.darkMode = value
            localStorage.setItem('darkMode', value)
        },

        signin(state, obj) {
            state.bearer = obj.access_token
            window.location.href = '/'
        },

        notification(state, text) {
            state.notification = text
        },

        loginError(state, text) {
            state.loginError = "";
            console.log(text);
            let content = [];

            for (const [key, value] of Object.entries(text)) {
                content += `${key}: ${value} \n`;
            }
            console.log("<- Error login : \n" + content);
            state.loginError = content;
        },

        // --- USER ---

        getUsers(state, obj) {
            state.users = obj
        },
        getUser(state, obj) {
            state.found = true;
            state.user = obj
        },

        deleteUser(state, user_id) {
            let index = state.users.findIndex(x => x.id === parseInt(user_id));
            state.users.splice(index, 1);
        },


        // --- POST ---
        getPosts(state, result) {
            state.posts = result
        },

        getPost(state, result) {
            state.post = result
        },

        setNewPost(state, obj) {
            state.newPost = obj
        },

        postPost(state, result) {
            state.posts.push(result)
        },

        updateNewPost(state, obj) {
            state.newPost.title = obj.title
            state.newPost.content = obj.content
        },

        deletePost(state, post_id) {
            let index = state.posts.findIndex(x => x.id === parseInt(post_id));
            state.posts.splice(index, 1);
        },


        // --- COM ---
        getComs(state, coms) {
            state.coms = coms
        },

        setComsHidden(state, value) {
            state.comsHidden = value
        },

        updateCom(state, obj) {
            let index = state.coms.findIndex(x => x.id === obj.id);
            state.coms[index].hide = obj.hide
        },

        postCom(state, result) {
            state.coms.push(result)
        },
        userComs(state, obj) {
            // console.log(obj);
            state.coms = obj;
        },


        // --- SCORE ---
        postVote(state, obj) {
            let index = state.posts.findIndex(x => x.id === obj.post_id);
            console.log("MUTA Score: ", obj.score);
            state.posts[index].score = state.posts[index].score + obj.score
        },

    },


    // ---------- ACTION -------------------------------------------------------------------------------------------------------
    actions: {

        setDarkMode(context, value) {
            context.commit('setDarkMode', value)
        },

        loginError(context, text) {
            console.log(text);
            context.commit('loginError', text)
        },

        notification(context, text) {
            context.commit('notification', text)
            setTimeout(() => { context.commit('notification', "null"); }, 5000);
        },

        async signup(context, obj) {
            let raw = JSON.stringify({
                "username": obj.username,
                "email": obj.email,
                "password": obj.password,
                "phone": obj.phone,
                "admin": 0
            })

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            await fetch(`${url}users`, requestOptions)
                .then((response) => {
                    console.log("-> Action SignUp: ", response);
                    if (!response.ok) {
                        throw (response.json())
                    }
                    response.json()
                })
                .then((result) => { return result })
                .catch(async(error) => { context.dispatch('loginError', (await error).errors) });
        },

        signin({ commit, dispatch }, obj) {

            var raw = JSON.stringify({
                "email": obj.email,
                "password": obj.password
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${url}login`, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw (response.json());
                })

            .then((result) => {
                    console.log("-> Action SingIn: ", result)
                    localStorage.setItem('bearer', result.access_token)
                    localStorage.setItem('id', btoa(result.user_id))
                    commit('signin', result)
                })
                .catch((error) => {
                    error.then((result) => {
                        console.log("<- Action Error: ", result)
                        dispatch("notification", result.message)
                    })
                });
        },

        // --- USER ---

        getUsers({ commit, dispatch }) {

            var requestOptions = {
                method: 'GET',
                headers: myHeaders
            };

            fetch(`${url}users`, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw (response.json());
                })

            .then((result) => {
                    console.log("-> Action Get Users: ", result)
                    commit('getUsers', result)
                })
                .catch((error) => {
                    error.then((result) => {
                        console.log("<- Action Error: ", result)
                        dispatch("notification", result.message)
                    })
                });
        },

        deleteUser({ commit, dispatch }, user_id) {

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${url}users/` + user_id, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw (response.json());
                })

            .then((result) => {
                    console.log("-> Action Delete User: ", result)
                    commit('deleteUser', result)
                })
                .catch((error) => {
                    error.then((result) => {
                        console.log("<- Action Error: ", result)
                        dispatch("notification", result.message)
                    })
                });
        },
        editUser(context, obj) {
            let isAdmin = false;
            console.log(context);
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('bearer'));
            // myHeaders.append("Authorization", "Bearer " + 'tNDrnnxlWuqxdJ3lYfmgYPpS3w9DB393diy3groM');
            let id = atob(localStorage.getItem('id'));
            console.log(obj);
            let json = {};

            for (const key in obj) {
                if (obj[key] != "") {
                    json[key] = obj[key];
                }
                if (key == "id") {
                    id = obj[key];
                    isAdmin = true
                }
            }
            let raw = JSON.stringify(json);
            console.log(json);
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
            };

            fetch(`${url}users/${id}`, requestOptions)
                .then(response => response.json())
                .then(obj => {
                    console.log('Success:', obj);
                    if (isAdmin) {
                        context.dispatch('getUsers', id)
                    } else {

                        context.dispatch('getUser', id)
                    }
                })
                .catch(error => console.log('error', error));
        },


        getUser(context, obj) {
            console.log(context);
            // let id = localStorage.getItem("id");
            let id = obj;

            var requestOptions = {
                method: 'get',
                headers: myHeaders,
            };

            fetch(`${url}users/${id}`, requestOptions)
                .then(response => response.json())
                .then(obj => {
                    console.log('Success:', obj);
                    context.commit('getUser', obj)
                })
                .catch(error => console.log('error', error));
        },

        // --- POST ---
        setNewPost(context, obj) {
            console.log(obj);
            context.commit('setNewPost', obj)
        },

        updateNewPost(context, obj) {
            console.log(obj);
            context.commit('updateNewPost', obj)
        },


        getPosts({ commit, dispatch }, obj) {

            myHeaders.delete("limit")
            myHeaders.delete("offset")

            myHeaders.append("limit", obj.limit);
            myHeaders.append("offset", obj.offset);


            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${url}posts`, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw (response.json());
                })

            .then((result) => {
                    console.log("-> Action Get Posts: ", result)
                    commit('getPosts', result)
                })
                .catch((error) => {
                    error.then((result) => {
                        console.log("<- Action Error: ", result)
                        dispatch("notification", result.message)
                    })
                });
        },

        getPost({ commit, dispatch }, post_id) {

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${url}post/` + post_id, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw (response.json());
                })

            .then((result) => {
                    console.log("-> Action Get Post: ", result)
                    commit('getPost', result)
                })
                .catch((error) => {
                    error.then((result) => {
                        console.log("<- Action Error: ", result)
                        dispatch("notification", result.message)
                    })
                });
        },

        postPost({ commit, dispatch }) {

            var raw = JSON.stringify({
                "user_id": atob(localStorage.getItem('id')),
                "title": this.state.newPost.title,
                "content": this.state.newPost.content,
                "image": this.state.newPost.image,
                "link": this.state.newPost.link,
                "score": 0,
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${url}posts`, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw (response.json());
                })

            .then((result) => {
                    console.log("-> Action Post Post: ", result)
                    commit('postPost', result)
                })
                .catch((error) => {
                    error.then((result) => {
                        console.log("<- Action Error: ", result)
                        dispatch("notification", result.message)
                    })
                });
        },

        deletePost({ commit, dispatch }, post_id) {

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${url}posts/` + post_id, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw (response.json());
                })

            .then((result) => {
                    console.log("-> Action Delete Post: ", result)
                    commit('deletePost', result)
                })
                .catch((error) => {
                    error.then((result) => {
                        console.log("<- Action Error: ", result)
                        dispatch("notification", result.message)
                    })
                });
        },

        getUserPost(context, obj) {
            // console.log(context.a);
            // myHeaders.append("user_id", localStorage.getItem('id'));
            myHeaders.append("user_id", obj);
            // console.log(obj);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders
            };

            fetch(`${url}userPosts`, requestOptions)
                .then(response => response.json())
                .then(obj => {
                    console.log('Success:', obj);
                    context.commit('getPosts', obj)
                })
                .catch(error => console.log('error', error));


        },
        updatePost({ dispatch }, obj) {
            console.log(obj);

            let raw = JSON.stringify(obj);

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${url}posts/` + obj.id, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw (response.json());
                })

            .then((result) => {
                    console.log("-> Action Put Post: ", result)
                    dispatch('getPosts', result)
                })
                .catch((error) => {
                    error.then((result) => {
                        console.log("<- Action Error: ", result)
                        dispatch("notification", result.message)
                    })
                });
        },

        // --- COM ---
        setComsHidden(context, value) {
            context.commit('setComsHidden', value)
        },

        setHideCom(context, obj) {
            context.commit('setHideCom', obj)
        },

        getComs({ commit, dispatch }, post_id) {

            myHeaders.delete("post_id")

            myHeaders.append("post_id", post_id);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`${url}comments`, requestOptions)

            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Get Coms: ", result)
                    commit('getComs', result)
                })
                .catch((error) => {
                    error.then((result) => {
                        console.log("<- Action Error: ", result)
                        dispatch("notification", result.message)
                    })
                });
        },

        postCom({ commit, dispatch }, obj) {

            var raw = JSON.stringify({
                "user_id": atob(localStorage.getItem('id')),
                "post_id": obj.post_id,
                "content": obj.content,
                "hide": 0

            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${url}comments`, requestOptions)

            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Post Com: ", result)
                    commit('postCom', result)
                })
                .catch((error) => {
                    error.then((result) => {
                        console.log("<- Action Error: ", result)
                        dispatch("notification", result.message)
                    })
                });
        },

        updateCom({ commit, dispatch }, obj) {

            var raw = JSON.stringify({
                "content": obj.content,
                "hide": obj.hide
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${url}comments/` + obj.id, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw (response.json());
                })

            .then((result) => {
                    console.log("-> Action Put Com: ", result)
                    commit('updateCom', result)
                })
                .catch((error) => {
                    error.then((result) => {
                        console.log("<- Action Error: ", result)
                        dispatch("notification", result.message)
                    })
                });
        },

        getUserCom({ commit, dispatch }, obj) {
            myHeaders.append("user-id", obj);
            // myHeaders.append("user-id", 1);
            // console.log(myHeaders);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders
            };

            fetch(`${url}userComments`, requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw (response.json());
                })

            .then((result) => {
                    console.log("-> Action Put Com: ", result)
                    commit('getComs', result)
                })
                .catch((error) => {
                    console.log(error);
                    error.then((result) => {
                        console.log("<- Action Error: ", result)
                        dispatch("notification", result.message)
                    })
                });
        },

        // --- SCORE ---
        postVote({ commit, dispatch }, obj) {

            var raw = JSON.stringify({
                "user_id": atob(localStorage.getItem('id')),
                "post_id": obj.post_id,
                "score": obj.score
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${url}score`, requestOptions)

            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw (response.json());
            })

            .then((result) => {
                    console.log("-> Action Post Score: ", result)
                    commit('postVote', result)
                })
                .catch((error) => {
                    error.then((result) => {
                        console.log("<- Action Error: ", result)
                        dispatch("notification", result.message)
                    })
                });
        }
    }
})


export default store;