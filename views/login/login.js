const gel = element => document.querySelector(element);


//submit user and password login;
gel('#login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post('/api/user/login', {
            username: gel('input[name=username]').value,
            password: gel('input[name=password]').value,
        });

        console.log('response:\n');
        console.log(response);

        if(response.data === 'OK!'){
            window.location.replace('/');
        };
    } catch (err){
        console.log(err.response);
    }
});