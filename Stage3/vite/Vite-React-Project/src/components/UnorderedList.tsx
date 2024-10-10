
export default function UnorderedList(){
  const cities:any = [
    'kloyphis', 'zlidridge', 'cuport', 'gorough', 'noyset', 'toni', 'qrine', 'vam', 'atheford','idoburn']
    const forbiddenCity:String = "Amesterdam";
    if(forbiddenCity == "Amesterdam" || forbiddenCity == "Moscow"){
      return (
        <ul className='list-group'>
          YOU HAVE NO HUMAN RIGHTS, because you're from <b>{forbiddenCity}</b>
        </ul>
    )
    }
    return (
      <ul className='list-group'>
        {cities.map(
          (item: any, index: any) => <li className="list-group-item">{index+1}. {item}</li>
          )}
      </ul>
  )
}