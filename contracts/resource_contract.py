
balances = Hash(default_value=0)

# offer_id -> { ip, price }
resource_offers = Hash(default_value=None)

@export
def create_offer(price: int, address: str):
    sender = ctx.caller
    resource_offers[sender] = {
        'price': price,
        'address': address,
        'identity': sender
    }

@export
def remove_offer():
    del resource_offers[sender]

@export
def purchase_offer(offer: str):
    sender = ctx.caller
    assert balances[sender] >= resource_offers[offer]['price'],\
    "Offer price exceeds available balance."
    balances[sender] -= resource_offers[offer]['price']
    balances[offer] += resource_offers[offer]['price']
    old_offer = resource_offers[offer]
    # want to make absolutely sure the purchaser key get's added
    new_offer = {
        'price': old_offer['price'],
        'address': old_offer['address'],
        'identity': old_offer['identity'],
        'purchaser': sender
    }
    resource_offers[offer] = new_offer

# these methods are for changing balance and are strictly for testing

@export
def free_cash(amount: int):
    sender = ctx.caller
    balances[sender] += amount
    
@export
def remove_cash(amount: int):
    sender = ctx.caller
    balances[sender] -= amount

# methods for retrieving state (some are for convenience only)

@export
def my_balance():
    return balances[ctx.caller]

@export
def my_offer():
    return resource_offers[ctx.caller]

@export
def all_offers():
    return resource_offers.all()

@export
def all_balances():
    return balances.all()

