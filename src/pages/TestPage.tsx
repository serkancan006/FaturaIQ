import NotifyService from "../services/NotifyService"

const TestPage = () => {
  const handleTest = () => {
    NotifyService.messageHot("Selam Merhaba",{position: "top-center", type:"success"})
  }
  return (
    <div>
        <h1>TestPage</h1>
        <button className="btn btn-primary" type="button" onClick={handleTest}>Test Et</button>
    </div>
  )
}

export default TestPage