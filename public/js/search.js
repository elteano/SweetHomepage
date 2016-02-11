// custom search based on the JSON representation of the data.

function search(str, planet_chunk)
{
	var ret_arr = [];
	str = str.toLowerCase();
	for (var i = 0; i < planet_chunk.ideas.length; i++)
	{
		if (planet_chunk.ideas[i].name.toLowerCase().indexOf(str) != -1)
		{
			ret_arr.push(i);
		}
	}
	return ret_arr;
}

