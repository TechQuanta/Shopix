import "./style.scss";

const GenderCheckbox = ({ onCheckboxChange, selectedRole }) => {

	return (
		<div className='maincheckboxrole'>
			<div className="maincheckboxrole-a">
				<form className="maincheckboxrole-form">
					<label className="maincheckboxrole-label">
						<input className="maincheckboxrole-input" type="radio" name="radio" value="buyer" onChange={() => onCheckboxChange("buyer")} />
						<span className="maincheckboxrole-span">Buyer</span>
					</label>
					<label className="maincheckboxrole-label">
						<input className="maincheckboxrole-input" type="radio" value="seller" name="radio" onChange={() => onCheckboxChange("seller")} />
						<span className="maincheckboxrole-span">Seller</span>
					</label>
				</form>
			</div>
		</div>
	);
};
export default GenderCheckbox;

