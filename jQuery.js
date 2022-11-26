$(() => {
    $("#root").on("click", (e)=>{
        console.log(`groot`);
        console.log(e.currentTarget);
    })

    // not able to log clicking the newly created divs
    $(".user-nft").on("click", (e)=>{
        console.log(`hello nft`);
        console.log(e);
    })

    $("h3").on("click", ()=>{
        console.log(`hi`)
    })
})