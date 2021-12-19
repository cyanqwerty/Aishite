// common
import Unit from "@/app/common/unit";
import { Props } from "@/app/common/props";
import { Stateful, Stateless } from "@/app/common/framework";
import Row from "@/app/layout/row";
import Center from "@/app/layout/center";
import Button from "@/app/widgets/button";
import Size from "@/app/layout/size";
import Stack from "@/app/layout/stack";
import Box from "@/app/layout/box";
import Spacer from "@/app/layout/spacer";
import Container from "@/app/layout/container";
import Offset from "@/app/layout/offset";
import Color from "@/app/common/color";
import Position from "@/app/layout/position";
import Column from "@/app/layout/column";
import { Grid, Cell } from "@/app/layout/grid";
import Scroll from "@/app/layout/scroll";
import Paging from "@/app/widgets/paging";
import Text from "@/app/layout/text";
import Transform from "@/app/layout/transform";
// states
import navigator from "@/states/navigator";

class FallbackProps extends Props<undefined> {
	constructor(args: Args<FallbackProps>) {
		super(args);
	}
}

class FallbackState {
	public index: number;

	constructor(args: Args<FallbackState>) {
		this.index = args.index;
	}
}

class Fallback extends Stateful<FallbackProps, FallbackState> {
	protected create() {
		return new FallbackState({ index: 0 });
	}
	protected postCSS(): React.CSSProperties {
		return {};
	}
	protected preCSS(): React.CSSProperties {
		return {};
	}
	protected build() {
		return (
			<Column id={"fallback"}>
				<Spacer>
					<section>
						<Stack>
							{[
								<section>
									<Offset type={"margin"} all={Unit(9.5)}>
										<Center x={true} y={true}>
											<Text size={Unit(24.5)} weight={"bold"} children={"Browser"}/>
										</Center>
										<Text>Browse galleries that matches your taste by providing query text to the form input.</Text>
										<Text type={"italic"}>e.g. language:english type:doujinshi</Text>
									</Offset>
									<Offset type={"margin"} all={Unit(29.5)}>
										<Size width={"auto"} height={Unit(29.5)}>
											<Button decoration={{ corner: { all: Unit(4.5) }, shadow: [[Color.DARK_100, 0, 0, 5, 0]], background: { color: Color.DARK_400 } }}
												onMouseDown={(I) => {
													navigator.replace("language:all", "BROWSER", {});
												}}
												onMouseEnter={(I) => {
													I.style({ background: { color: Color.DARK_500 } });
												}}
												onMouseLeave={(I) => {
													I.style(null);
												}}
												children={<Text>Click to open new Browser</Text>}
											/>
										</Size>
									</Offset>
								</section>,
								<section>
									<Offset type={"margin"} all={Unit(9.5)}>
										<Center x={true} y={true}>
											<Text size={Unit(24.5)} weight={"bold"} children={"Viewer"}/>
										</Center>
										<Text>Work in progress... Work in progress... Work in progress...</Text>
									</Offset>
								</section>,
								<section>
									<Offset type={"margin"} all={Unit(9.5)}>
										<Center x={true} y={true}>
											<Text size={Unit(24.5)} weight={"bold"} children={"Discord"}/>
										</Center>
										<Text>Work in progress... Work in progress... Work in progress...</Text>
									</Offset>
								</section>
							].map((children, x) => {
								return (
									<Transform key={x} translate={[Unit((x - this.state.index) * 100, "%"), Unit(0, "%")]}>
										<Center x={true} y={true} children={children}/>
									</Transform>
								);
							})}
						</Stack>
					</section>
				</Spacer>
				<Size height={Unit(20)}>
					<Offset type={"margin"} top={Unit(29.5)} bottom={Unit(29.5)}>
						<Paging toggle={true} index={0} length={3} overflow={3} shortcut={{ first: false, last: false }}
							onPaging={(index) => {
								// update
								this.setState({ ...this.state, index: index });
								// approve
								return true;
							}}
							onButton={(key, index, indexing, jump) => {
								return (
									<Size key={key} width={Unit(20)}>
										<Offset type={"margin"} left={Unit(69)} right={Unit(69)}>
											<Button decoration={{ corner: { all: Unit(100, "%") }, shadow: [[Color.DARK_100, 0, 0, 5, 0]], background: { color: indexing ? Color.SPOTLIGHT : Color.DARK_500 } }}
												onMouseDown={(I) => {
													I.style(null, () => {
														jump();
													});
												}}
												onMouseEnter={(I) => {
													if (!indexing) {
														I.style({ background: { color: Color.TEXT_000 } });
													}
												}}
												onMouseLeave={(I) => {
													I.style(null);
												}}
											/>
										</Offset>
									</Size>
								);
							}}
						/>
					</Offset>
				</Size>
			</Column>
		);
	}

}

export default Fallback;