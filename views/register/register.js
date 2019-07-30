const gel = element => document.querySelector(element);

//submit user and password login;
gel('#register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post('/api/user/register', 
        {
            alias:     gel('input[name=alias]').value,
            username:  gel('input[name=username]').value,
            password:  gel('input[name=password]').value,
            password2: gel('input[name=password2]').value,
        });
        console.log(response);
    } catch (err){
        console.log(err.response);
    }
});