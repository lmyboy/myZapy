const gel = element => document.querySelector(element);


//submit user and password login;
gel('#add-contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post(`/api/user/contact/${gel('input[name=contact]').value}`);
        console.log('response:\n');
        console.log(response);
        return;
    } catch (err){
        console.log(err.response.data);
    }
});

(async () => {
    const response = await axios.get('/api/user/contact');
    response.data.forEach((contact) => {
        gel('#contacts').innerHTML += `
        <p>${contact.alias}</p>`
    });
    console.log(response);
})();

setInterval(async()=>{
    const response = await axios.get('/api/user/contact?tamanho=1')
    if (+response.data === gel('#contacts').children.length) {
        console.log(response);
    };
}, 500);