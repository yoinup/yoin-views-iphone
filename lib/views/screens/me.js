Yvi.MeTabOptionView = Em.View.extend( Yvi.TabOption, {
	classNames: ['me-tab'],
	currentTabView: null


});


Yvi.MeScreenView = Yvi.ScreenView.extend({

	elementId: 'me_screen',

	user: null,

	unexchangedinvitations: null,
	
	sentinvitations: null,

	//venuesBinding: Em.Binding.oneWay('App.orderedVenuesController')

	currentTabView: null,

	didInsertElement: function() {
		this._super();
	}



});

/*
<div id="me-content-header-text-name">


	{{user.name}}

</div>
*/

/*
		{{#view Yn.ScrollWrapperView id="me-scroll-wrapper" contentBinding="unexchangedinvitations.content" }}

			<div id="me-scroller">

				<div id="me-content-bio" class="box">

					<div class="box-title box-top">

						{{I18n bio }}

					</div>

					<div class="box-content">
						
						El término 'Frapuccino' se ha convertido en los últimos años en un indispensable.

					</div>

				</div>

				<div id="me-content-unexchangedinvitations" class="box">

					<div class="box-title box-top">

						{{I18n unexchanged_invitations }}

					</div>

					<div class="box-content">
						
						{{#each unexchangedinvitations}}

							<div class="unexchangedinvitation">

								<div class="unexchangedinvitation-image inline">

									<img class="rounded-small-image" src="http://flickholdr.com/48/48/coffe,cup" />

								</div>

								<div class="unexchangedinvitation-product inline">

									{{product.name}}

									<div class="unexchangedinvitation-city">

										<div class="icon inline" icon="b">

										</div>

										<div class="city-name inline">

											{{city.name}}

										</div>

									</div>

								</div>

								<div class="unexchangedinvitation-price inline">

									{{product.price}} {{I18n currency_symbol}}

								</div>

							</div>

						{{/each}}

					</div>

				<div class="scroll-bottom">

				</div>

			</div>
			
			
		{{/view}}
			*/

