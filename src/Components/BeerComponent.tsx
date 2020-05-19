import React from 'react';
import { isUndefined } from 'util';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';

type BeerDetailsProps = {
    url: string;
}
type ComponentState = {
    beerlist: [];
    beerName: string[];
    selectedBeer: string;
    selctedbeerItem: any;

};
export class BeerComponent extends React.Component<
    BeerDetailsProps,
    ComponentState>{
    constructor(props: BeerDetailsProps) {
        super(props);
        this.state = {
            beerlist: [],
            beerName: [],
            selectedBeer: "",
            selctedbeerItem: {}
        };
        this.select = this.select.bind(this);
    }

    componentWillMount() {
        fetch("https://api.punkapi.com/v2/beers")
            .then((res) => res.json())
            .then((data) => {
                this.setState({ beerlist: data });

                console.log("test" + this.state.beerlist)

                let beernameslocal: string[] = [];
                for (const item of this.state.beerlist) {
                    beernameslocal.push(item["name"]);
                }
                this.setState({ beerName: beernameslocal });
            })
            .catch(console.log)

    }
    select(e: Option) {
        this.setState({ selectedBeer: e.value });
        for (const item of this.state.beerlist) {
            if (item["name"] === e.value) {
                this.setState({ selctedbeerItem: item });
            }
        }
    }
    render() {
        return (
            <div>
                <p>list of beers</p>
                {!isUndefined(this.state.beerlist) && this.state.beerlist.length > 0 &&
                    <Dropdown options={this.state.beerName}
                        onChange={this.select}
                        value={this.state.beerName[0]}
                        placeholder="select beer"
                    />
                }
                {this.state.selctedbeerItem["name"] === this.state.selectedBeer && (<div>
                    <p>Name - {this.state.selctedbeerItem["name"]}</p>
                    <p>Tagline - {this.state.selctedbeerItem["tagline"]}</p>
                    <p>BrewedDate - {this.state.selctedbeerItem["first_brewed"]}</p>

                </div>)};

            </div>
        );

    }
}



export default BeerComponent;