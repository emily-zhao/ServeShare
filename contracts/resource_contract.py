
balances = Hash(default_value=0)

# offer_id -> { ip, price }
resource_offers = Hash(default_value=None)

@export
def create_offer(price: int, address: str):
    sender = ctx.caller
    resource_offers[sender] = {'price': price, 'address': address}

@export
def purchase_offer(offer: str):
    sender = ctx.caller
    assert balances[sender] >= resource_offers[offer]['price'],\
    "Offer price exceeds available balance."
    balances[sender] -= resource_offers[offer]['price']
    balances[offer] += resource_offers[offer]['price']
    resource_offers[offer]['purchaser'] = sender

@export
def free_cash(amount: int):
    sender = ctx.caller
    balances[sender] += amount

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
all_balances():
    return balances.all()

