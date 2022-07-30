class InfiniteScroll{
  constructor({container, loader}){
    this.container = container
    this.loader = loader
    this.page = 1
    this.loading = false
    this.init()
  }

  init(){
    // window.onload = this.getData;
    window.addEventListener('load', this.getData)
    window.addEventListener('scroll', () => {
      if(this.loading) return
      if(window.scrollY + window.innerHeight >= document.body.offsetHeight){
        this.setLoading(true)
        this.getData()
      }
    })
  }

  setLoading(flag){
    if(flag){
      this.loader.classList.remove('hidden')
    } else {
      this.loader.classList.add('hidden')
    }

    this.loading = flag
  }

  getData = async() => {

    const apiUrl = `https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=4`
    try{
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log(data)
      this.displayPosts(data)
      
    } catch (err){
      console.log(err)
    }
  }

  displayPosts(posts){
     this.container.innerHTML += posts.map(post=>(
      `
       <div class="post">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
       </div>
    `
     )
    ).join('');
    this.setLoading(false)
    this.page++
  }
}

const infScroll = new InfiniteScroll({
  container: document.querySelector('.container'),
  loader: document.querySelector('.loader-box')
}
  
)
console.log(infScroll)
